import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { ChartLineLinear } from "./components/ui/chart-line-linear";
import { ChartBarDefault } from "./components/chart-bar-default";
import { ChartPieLabelList } from "./components/chart-pie-label-list";
const ResponsiveGridLayout = WidthProvider(GridLayout);

export default function Dashboard() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 4, isBounded: true },
    { i: "b", x: 1, y: 0, w: 1, h: 4, isBounded: true },
    { i: "c", x: 4, y: 0, w: 1, h: 4, isBounded: true },
  ];
  return (
    <ResponsiveGridLayout
      resizeHandles={["se"]}
      isDraggable={true}
      isResizable={true}
      className="layout"
      layout={layout}
      cols={3}
      rowHeight={100}
      width={1200}
    >
      <div key="a">
        <ChartLineLinear />
      </div>
      <div key="b">
        <ChartBarDefault />
      </div>
      <div className="border-2" key="c">
        <ChartPieLabelList />
      </div>
    </ResponsiveGridLayout>
  );
}
// export default function Dashboard() {
//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="@container/main flex flex-1 flex-col gap-2">
//         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//           <SectionCards />
//           <div className="px-4 lg:px-6">
//             <ChartAreaInteractive />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
