import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ChartLineLinear } from "./components/ui/chart-line-linear";
import { ChartBarDefault } from "./components/chart-bar-default";
import { ChartPieLabelList } from "./components/chart-pie-label-list";
import { useStore } from "./store";

const ResponsiveGridLayout = WidthProvider(GridLayout);
type ChartKey = "token-usage" | "latency-distribution" | "cost-analysis";

const charts = {
  "token-usage": <ChartLineLinear />,
  "latency-distribution": <ChartBarDefault />,
  "cost-analysis": <ChartPieLabelList />,
};

export default function Dashboard() {
  const layout = useStore((state) => state.layout);
  const setLayout = useStore((state) => state.setLayout);

  return (
    <div>
      <ResponsiveGridLayout
        draggableHandle=".yes-drag"
        layout={layout}
        cols={3}
        onLayoutChange={setLayout}
        rowHeight={100}
      >
        {layout.map((item) => (
          <div key={item.i}>{charts[item.i as ChartKey]}</div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
