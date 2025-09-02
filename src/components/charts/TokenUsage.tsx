"use client";

import { GripHorizontal, RotateCcw, TrendingUp, X } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import type { TokenUsage } from "@/services/data";
import { fetchTokenUsage } from "@/services/mockApi";
import TokenUsageSkeleton from "@/components/skeletons/TokenUsageSkeleton";
import { Button } from "../ui/button";

export const description = "A linear line chart";

const chartConfig = {
  tokens: {
    label: "Tokens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function TokenUsage() {
  const deleteWidget = useStore((state) => state.deleteWidget);
  const {
    isPending,
    error,
    refetch,
    data: chartData = [],
  } = useQuery<TokenUsage[]>({
    queryKey: ["tokenUsage"],
    queryFn: fetchTokenUsage,
  });
  if (isPending) return <TokenUsageSkeleton />;

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
    <Card className="max-h-full max-w-full w-full h-full overflow-auto ">
      <CardHeader>
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Token Usage</CardTitle>
            <CardDescription>June - Sept 2025</CardDescription>
          </div>
          <Button
            className="no-drag"
            variant={"outline"}
            size={"icon"}
            onClick={() => deleteWidget("token-usage")}
          >
            <X />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -38,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              }
            />
            <YAxis
              domain={[1000, "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={100}
              // tick={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="tokens"
              type="linear"
              stroke="var(--color-tokens)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this timestamp <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
