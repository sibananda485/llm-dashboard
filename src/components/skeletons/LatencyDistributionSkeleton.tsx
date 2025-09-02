import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripHorizontal, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LatencyDistributionSkeleton() {
  return (
    <Card className="max-h-full max-w-full w-full h-full overflow-auto">
      <CardHeader className="mb-0">
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-24 mt-1" />
            </CardDescription>
          </div>
          <Button
            className="no-drag"
            variant={"outline"}
            size={"icon"}
            disabled
          ></Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full h-60 flex flex-col justify-end items-center p-6">
          {/* Chart area skeleton */}
          <div className="w-full h-full relative">
            {/* Bar chart skeleton - multiple bars of varying heights */}
            <div className="flex items-end justify-between h-full w-full gap-6">
              <div className="flex flex-col items-center gap-2 flex-1 ">
                <Skeleton className="w-full h-16 rounded-t-lg" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="w-full h-32 rounded-t-lg" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="w-full h-24 rounded-t-lg" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="w-full h-40 rounded-t-lg" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <Skeleton className="h-4 w-44" />
          <TrendingUp className="h-4 w-4 opacity-50" />
        </div>
        <div className="text-muted-foreground leading-none">
          <Skeleton className="h-3 w-60" />
        </div>
      </CardFooter>
    </Card>
  );
}
