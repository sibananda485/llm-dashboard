import { DashboardCanvas } from "@/features/dashboard/components/DashboardCanvas";
import { DashboardToolbar } from "@/features/dashboard/components/DashboardToolbar";
import { useTenantContext } from "@/features/tenant/TenantProvider";

export const DashboardPage = () => {
  const { tenantId, userId, role } = useTenantContext();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-6">
      <header className="mb-4 rounded-lg border bg-card p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Multi-tenant SaaS Dashboard</p>
        <h1 className="text-xl font-semibold">Tenant: {tenantId}</h1>
        <p className="text-sm text-muted-foreground">
          User: {userId} | Role: {role}
        </p>
      </header>
      <section className="mb-4">
        <DashboardToolbar />
      </section>
      <DashboardCanvas />
    </main>
  );
};

