export interface CostAnalysis {
  model_name: string;
  cost: number;
  fill: string;
}

export interface LatencyDistribution {
  latency_ms: string;
  request_count: number;
}

export interface TokenUsage {
  timestamp: string;
  tokens: number;
}

export const costAnalysisData: CostAnalysis[] = [
  { model_name: "gpt4", cost: 450.75, fill: "var(--color-gpt4)" },
  { model_name: "claude2", cost: 320.5, fill: "var(--color-claude2)" },
  { model_name: "llama2", cost: 150.25, fill: "var(--color-llama2)" },
];

export const LatencyDistributionData: LatencyDistribution[] = [
  { latency_ms: "100 ms", request_count: 50 },
  { latency_ms: "200 ms", request_count: 120 },
  { latency_ms: "300 ms", request_count: 80 },
  { latency_ms: "400 ms", request_count: 30 },
];

export const tokenUsageData: TokenUsage[] = [
  { timestamp: "2023-10-01T10:00:00Z", tokens: 1200 },
  { timestamp: "2023-10-01T10:05:00Z", tokens: 1500 },
  { timestamp: "2023-10-01T10:10:00Z", tokens: 1350 },
  { timestamp: "2023-10-01T10:15:00Z", tokens: 1600 },
];
