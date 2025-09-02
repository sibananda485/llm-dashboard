import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CostAnalysisSkeleton() {
  return (
    <Card className="flex flex-col max-h-full max-w-full w-full h-full overflow-auto">
      <CardHeader>
        <GripHorizontal className="absolute left-1/2 -translate-x-1/2 top-2 hover:cursor-grab active:cursor-grabbing outline-0 transition-transform hover:scale-125 active:scale-150 yes-drag" />
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
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

      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
          <div className="w-48 h-48">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="text-muted-foreground leading-none">
          <Skeleton className="h-2 w-56" />
        </div>
      </CardFooter>
    </Card>
  );
}
