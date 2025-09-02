"use client";

import { GripHorizontal, RotateCcw, TrendingUp, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import type { LatencyDistribution } from "@/services/data";
import { fetchLatencyDistribution } from "@/services/mockApi";
import LatencyDistributionSkeleton from "@/components/skeletons/LatencyDistributionSkeleton";
import { Button } from "../ui/button";

export const description = "A bar chart";

const chartConfig = {
  request_count: {
    label: <p className="pe-3">Request Count</p>,
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function LatencyDistribution() {
  const deleteWidget = useStore((state) => state.deleteWidget);
  const {
    isPending,
    error,
    refetch,
    data: chartData = [],
  } = useQuery<LatencyDistribution[]>({
    queryKey: ["latencyDistribution"],
    queryFn: fetchLatencyDistribution,
  });

  if (isPending) return <LatencyDistributionSkeleton />;

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
    <Card className="max-h-full max-w-full w-full h-full overflow-auto">
      <CardHeader>
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Latency Distribution</CardTitle>
            <CardDescription>June - Sept 2025</CardDescription>
          </div>
          <Button
            className="no-drag"
            variant={"outline"}
            size={"icon"}
            onClick={() => deleteWidget("latency-distribution")}
          >
            <X />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="latency_ms"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="request_count"
              fill="var(--color-request_count)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this latency <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total request count for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
