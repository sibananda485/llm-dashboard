import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  BarChart3,
  Clock,
  DollarSign,
  Activity,
  Users,
  type LucideProps,
  Check,
  Sparkle,
  CheckCheck,
} from "lucide-react";
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { cn } from "./lib/utils";
import { Badge } from "./components/ui/badge";
import { useStore } from "./store";
interface WidgetTypes {
  id: string;
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  category: string;
  disable: boolean;
}
const widgetTypes: WidgetTypes[] = [
  {
    id: "token-usage",
    name: "Token Usage Over Time",
    description: "Track token consumption trends and patterns",
    icon: BarChart3,
    category: "Usage Analytics",
    disable: false,
  },
  {
    id: "latency-distribution",
    name: "Latency Distribution",
    description: "Monitor response times and performance metrics",
    icon: Clock,
    disable: false,
    category: "Performance",
  },
  {
    id: "cost-analysis",
    name: "Cost Analysis",
    description: "Analyze spending patterns and cost optimization",
    icon: DollarSign,
    disable: false,
    category: "Financial",
  },
  {
    id: "error-rate",
    name: "Error Rate Monitor",
    description: "Track API errors and success rates",
    disable: true,
    icon: Activity,
    category: "Performance",
  },
  {
    id: "user-activity",
    name: "User Activity",
    description: "Monitor user engagement and active sessions",
    icon: Users,
    category: "Usage Analytics",
    disable: true,
  },
];

const categories = [...new Set(widgetTypes.map((widget) => widget.category))];

export default function Toolbar() {
  const layout = useStore((state) => state.layout);
  const addGrid = useStore((state) => state.addGrid);
  const [selectedWidget, setSelectedWidget] = useState<WidgetTypes | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleAddWidget = (widget: WidgetTypes) => {
    addGrid(widget.id);
    setIsOpen(false);
    setSelectedWidget(null);
  };
  return (
    <div className="mx-6 mt-2 ms-auto">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add Widget
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add New Widget
            </DialogTitle>
            <DialogDescription>
              Choose a widget type to add to your dashboard. Each widget
              provides different insights into your API usage and performance.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {widgetTypes
                    .filter((widget) => widget.category === category)
                    .map((widget) => {
                      const IconComponent = widget.icon;
                      const isSelected = selectedWidget?.id === widget.id;
                      const hasInGrid = !!layout.find(
                        (item) => item.i == widget.id
                      );
                      const isDisable = widget.disable || hasInGrid;
                      return (
                        <div
                          key={widget.id}
                          className={cn(
                            "relative p-4 rounded-lg border cursor-pointer transition-all duration-200",
                            isSelected && "outline-2 outline-foreground",
                            isDisable && "opacity- cursor-not-allowed"
                          )}
                          onClick={() =>
                            !isDisable && setSelectedWidget(widget)
                          }
                        >
                          <div className="flex items-start gap-3">
                            <Button variant={"outline"} size={"icon"}>
                              <IconComponent className="w-5 h-5" />
                            </Button>
                            <div className="flex-1 min-w-0">
                              <div className="flex gap-2">
                                <h4 className="font-medium text-sm mb-1">
                                  {widget.name}
                                </h4>
                                {widget.disable && (
                                  <Badge className="h-fit" variant={"outline"}>
                                    <Sparkle />
                                    coming soon
                                  </Badge>
                                )}
                                {hasInGrid && (
                                  <Badge className="bg-green-500 h-fit dark:text-white dark:bg-green-900/60">
                                    <CheckCheck />
                                    used
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {widget.description}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <Badge className="absolute top-1 right-1 ">
                              <Check />
                              selected
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedWidget && handleAddWidget(selectedWidget)}
              disabled={!selectedWidget}
            >
              Add Widget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
