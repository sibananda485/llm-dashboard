import type { Layouts } from "react-grid-layout";
import { create } from "zustand";
import { clearLayoutsFromStorage, saveLayoutsToStorage } from "@/lib/storage/layoutStorage";
import type { DashboardScope, LayoutProfile, LayoutProfileId } from "@/types/dashboard.types";

const DEFAULT_PROFILE_ID = "default";

const DEFAULT_PROFILES: LayoutProfile[] = [
  {
    id: DEFAULT_PROFILE_ID,
    name: "Default",
    isDefault: true,
  },
];

const getScopeKey = (scope: DashboardScope): string =>
  `${scope.tenantId}:${scope.userId}:${scope.role}:${scope.profileId}`;

interface DashboardLayoutState {
  profiles: LayoutProfile[];
  activeProfileId: LayoutProfileId;
  layoutsByScope: Record<string, Layouts>;
  setLayoutsForScope: (scope: DashboardScope, layouts: Layouts) => void;
  getLayoutsForScope: (scopeKey: string) => Layouts | null;
  addProfile: (name: string) => LayoutProfile;
  setActiveProfile: (profileId: LayoutProfileId) => void;
  removeProfile: (profileId: LayoutProfileId) => void;
  resetScopeLayout: (scope: DashboardScope) => void;
}

const buildProfile = (name: string): LayoutProfile => ({
  id: window.crypto.randomUUID(),
  name,
  isDefault: false,
});

export const useDashboardLayoutStore = create<DashboardLayoutState>((set, get) => ({
  profiles: DEFAULT_PROFILES,
  activeProfileId: DEFAULT_PROFILE_ID,
  layoutsByScope: {},
  setLayoutsForScope: (scope, layouts) => {
    const scopeKey = getScopeKey(scope);
    saveLayoutsToStorage(scope, layouts);

    set((state) => ({
      layoutsByScope: {
        ...state.layoutsByScope,
        [scopeKey]: layouts,
      },
    }));
  },
  getLayoutsForScope: (scopeKey) => get().layoutsByScope[scopeKey] ?? null,
  addProfile: (name) => {
    const nextProfile = buildProfile(name);

    set((state) => ({
      profiles: [...state.profiles, nextProfile],
      activeProfileId: nextProfile.id,
    }));

    return nextProfile;
  },
  setActiveProfile: (profileId) => set({ activeProfileId: profileId }),
  removeProfile: (profileId) => {
    if (profileId === DEFAULT_PROFILE_ID) {
      return;
    }

    set((state) => {
      const profiles = state.profiles.filter((profile) => profile.id !== profileId);
      const activeProfileId = state.activeProfileId === profileId ? DEFAULT_PROFILE_ID : state.activeProfileId;

      return {
        profiles,
        activeProfileId,
      };
    });
  },
  resetScopeLayout: (scope) => {
    const scopeKey = getScopeKey(scope);
    clearLayoutsFromStorage(scope);

    set((state) => {
      const { [scopeKey]: _removed, ...layoutsByScope } = state.layoutsByScope;
      return { layoutsByScope };
    });
  },
}));

