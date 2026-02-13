import type { SalesWidgetData } from "@/features/widgets/sales/sales.types";

const SALES_WIDGET_MOCK_DATA: SalesWidgetData = {
  records: [
    { region: "US-East", owner: "Team Alpha", revenue: 182000, cost: 113000, marginPct: 37.9 },
    { region: "US-West", owner: "Team Beta", revenue: 146400, cost: 92000, marginPct: 37.2 },
    { region: "EU", owner: "Team Delta", revenue: 127900, cost: 81400, marginPct: 36.4 },
    { region: "APAC", owner: "Team Sigma", revenue: 99400, cost: 64200, marginPct: 35.4 },
  ],
  timeseries: [
    { day: "Mon", revenue: 72000, orders: 950 },
    { day: "Tue", revenue: 76400, orders: 990 },
    { day: "Wed", revenue: 80800, orders: 1012 },
    { day: "Thu", revenue: 78200, orders: 1001 },
    { day: "Fri", revenue: 84800, orders: 1094 },
    { day: "Sat", revenue: 63500, orders: 810 },
    { day: "Sun", revenue: 59200, orders: 774 },
  ],
};

export interface SalesService {
  fetchSalesWidgetData: () => Promise<SalesWidgetData>;
}

class MockSalesService implements SalesService {
  public async fetchSalesWidgetData(): Promise<SalesWidgetData> {
    return Promise.resolve(SALES_WIDGET_MOCK_DATA);
  }
}

export const salesService: SalesService = new MockSalesService();

