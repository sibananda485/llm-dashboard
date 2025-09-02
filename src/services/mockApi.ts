import {
  costAnalysisData,
  tokenUsageData,
  LatencyDistributionData,
  type CostAnalysis,
  type LatencyDistribution,
  type TokenUsage,
} from "./data";

export const fetchCostAnalysis: () => Promise<CostAnalysis[]> = async () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        // reject("Something went wrong");
        resolve(costAnalysisData);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchLatencyDistribution: () => Promise<
  LatencyDistribution[]
> = async () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        // reject("Something went wrong");
        resolve(LatencyDistributionData);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchTokenUsage: () => Promise<TokenUsage[]> = async () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        // reject("Something went wrong");
        resolve(tokenUsageData);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};
