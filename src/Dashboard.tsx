import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useStore } from "./store";
import { TokenUsage } from "./components/charts/TokenUsage";
import { LatencyDistribution } from "./components/charts/LatencyDistribution";
import { CostAnalysis } from "./components/charts/CostAnalysis";

const ResponsiveGridLayout = WidthProvider(GridLayout);
type ChartKey = "token-usage" | "latency-distribution" | "cost-analysis";

const charts = {
  "token-usage": <TokenUsage />,
  "latency-distribution": <LatencyDistribution />,
  "cost-analysis": <CostAnalysis />,
};

export default function Dashboard() {
  const layout = useStore((state) => state.layout);
  const setLayout = useStore((state) => state.setLayout);

  return (
    <div>
      <ResponsiveGridLayout
        layout={layout}
        onLayoutChange={setLayout}
        cols={3}
        rowHeight={100}
        draggableHandle=".yes-drag"
      >
        {layout.map((item) => (
          <div key={item.i}>{charts[item.i as ChartKey]}</div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
