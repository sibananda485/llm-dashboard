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

export default function TokenUsageSkeleton() {
  return (
    <Card className="max-h-full max-w-full w-full h-full overflow-auto">
      <CardHeader>
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Skeleton className="h-6 w-28" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-32 mt-1" />
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
        <div className="w-full h-60 flex flex-col py-4">
          {/* Chart area skeleton */}
          <div className="flex-1 relative">
            {/* Line chart area */}
            <div className=" h-full relative">
              {/* Grid lines skeleton */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-px w-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <Skeleton className="h-4 w-48" />
          <TrendingUp className="h-4 w-4 opacity-50" />
        </div>
        <div className="text-muted-foreground leading-none">
          <Skeleton className="h-3 w-56" />
        </div>
      </CardFooter>
    </Card>
  );
}
