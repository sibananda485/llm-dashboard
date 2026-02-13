import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboardScope } from "@/features/dashboard/hooks/useDashboardScope";
import { useDashboardLayoutStore } from "@/features/dashboard/store/layout.store";
import { useWidgetVisibilityStore } from "@/features/dashboard/store/widget-visibility.store";
import { THEMES, useThemeStore, type ThemeMode } from "@/features/preferences/store/theme.store";
import { usePermissionContext } from "@/features/tenant/PermissionProvider";
import { listWidgetMetadata } from "@/features/widgets/registry/widgetRegistry";

const resolveThemeMode = (value: string): ThemeMode => {
  if (THEMES.includes(value as ThemeMode)) {
    return value as ThemeMode;
  }
  return "system";
};

export const DashboardToolbar = () => {
  const { scope, scopeKey } = useDashboardScope();
  const { hasRole } = usePermissionContext();
  const [profileName, setProfileName] = useState("");

  const profiles = useDashboardLayoutStore((state) => state.profiles);
  const activeProfileId = useDashboardLayoutStore((state) => state.activeProfileId);
  const addProfile = useDashboardLayoutStore((state) => state.addProfile);
  const setActiveProfile = useDashboardLayoutStore((state) => state.setActiveProfile);
  const removeProfile = useDashboardLayoutStore((state) => state.removeProfile);
  const resetScopeLayout = useDashboardLayoutStore((state) => state.resetScopeLayout);

  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleWidgetVisibility = useWidgetVisibilityStore((state) => state.toggleWidgetVisibility);
  const setVisibleWidgets = useWidgetVisibilityStore((state) => state.setVisibleWidgets);
  const visibleWidgetIds = useWidgetVisibilityStore((state) => state.getVisibleWidgets(scopeKey) ?? []);

  const allWidgetMetadata = useMemo(
    () => listWidgetMetadata().filter((widget) => hasRole(widget.allowedRoles)),
    [hasRole],
  );
  const allWidgetIds = useMemo(() => allWidgetMetadata.map((widget) => widget.id), [allWidgetMetadata]);

  const isCustomProfile = useMemo(
    () => profiles.some((profile) => profile.id === activeProfileId && !profile.isDefault),
    [activeProfileId, profiles],
  );

  const onCreateProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = profileName.trim();
    if (!trimmedName) {
      return;
    }

    addProfile(trimmedName);
    setProfileName("");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3">
      <form className="flex items-center gap-2" onSubmit={onCreateProfile}>
        <Input className="w-40" placeholder="New layout name" value={profileName} onChange={(event) => setProfileName(event.target.value)} />
        <Button size="sm" type="submit" variant="secondary">
          Save layout
        </Button>
      </form>

      <Select value={activeProfileId} onValueChange={setActiveProfile}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Layout profile" />
        </SelectTrigger>
        <SelectContent>
          {profiles.map((profile) => (
            <SelectItem key={profile.id} value={profile.id}>
              {profile.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={theme} onValueChange={(value) => setTheme(resolveThemeMode(value))}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((themeOption) => (
            <SelectItem key={themeOption} value={themeOption}>
              {themeOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {allWidgetMetadata.map((widget) => {
        const isVisible = visibleWidgetIds.includes(widget.id);
        const variant = isVisible ? "default" : "outline";
        return (
          <Button
            key={widget.id}
            size="sm"
            variant={variant}
            onClick={() => toggleWidgetVisibility(scope, widget.id, allWidgetIds)}
          >
            {isVisible ? `Hide ${widget.title}` : `Add ${widget.title}`}
          </Button>
        );
      })}

      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          resetScopeLayout(scope);
          setVisibleWidgets(scope, allWidgetIds);
        }}
      >
        Reset to default
      </Button>

      <Button disabled={!isCustomProfile} size="sm" variant="destructive" onClick={() => removeProfile(activeProfileId)}>
        Remove layout
      </Button>
    </div>
  );
};
