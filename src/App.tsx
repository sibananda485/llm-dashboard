import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "./Dashboard";
import DashboardToolbar from "./DashboardToolbar";
import { AppSidebar } from "./components/layout/app-sidebar";
import { SiteHeader } from "./components/layout/site-header";
import ModelSelectForm from "./ModelSelectForm";

export default function App() {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <DashboardToolbar />
        <ModelSelectForm />
        <Dashboard />
      </SidebarInset>
    </SidebarProvider>
  );
}
