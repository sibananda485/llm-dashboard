"use client";

import { GripHorizontal, RotateCcw, TrendingUp, X } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { fetchCostAnalysis } from "@/services/mockApi";
import type { CostAnalysis } from "@/services/data";
import CostAnalysisSkeleton from "@/components/skeletons/CostAnalysisSkeleton";
import { Button } from "../ui/button";

export const description = "A pie chart with a label list";

const chartConfig = {
  cost: {
    label: "Costs",
  },
  gpt4: {
    label: "GPT-4",
    color: "var(--chart-gpt)",
  },
  claude2: {
    label: "Claude 2",
    color: "var(--chart-claude)",
  },
  llama2: {
    label: "Llama 2",
    color: "var(--chart-meta)",
  },
} satisfies ChartConfig;

export function CostAnalysis() {
  const deleteWidget = useStore((state) => state.deleteWidget);
  const {
    isPending,
    error,
    refetch,
    data: chartData = [],
  } = useQuery<CostAnalysis[]>({
    queryKey: ["costAnalysis"],
    queryFn: fetchCostAnalysis,
  });
  if (isPending) return <CostAnalysisSkeleton />;

  if (error)
    return (
      <Card className="flex flex-col bg-red-900/10 max-h-full max-w-full w-full h-full overflow-auto justify-center items-center">
        <div className="text-destructive font-bold tracking-tighter">
          Something went wrong
        </div>
        <Button onClick={() => refetch()} variant={"outline"}>
          Retry <RotateCcw />
        </Button>
      </Card>
    );

  return (
    <Card className="flex flex-col max-h-full max-w-full w-full h-full overflow-auto">
      <CardHeader>
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
          <Button
            className="no-drag"
            variant={"outline"}
            size={"icon"}
            onClick={() => deleteWidget("cost-analysis")}
          >
            <X />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="cost" hideLabel />}
            />
            <Pie data={chartData} dataKey="cost">
              <LabelList
                dataKey="model_name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total cost for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
