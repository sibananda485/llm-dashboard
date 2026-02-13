export interface SalesRecord {
  region: string;
  owner: string;
  revenue: number;
  cost: number;
  marginPct: number;
}

export interface SalesTimeseriesPoint {
  day: string;
  revenue: number;
  orders: number;
}

export interface SalesWidgetData {
  records: SalesRecord[];
  timeseries: SalesTimeseriesPoint[];
}

