import type { WidgetMetadata } from "@/types/widget.types";

export const salesWidgetMeta: WidgetMetadata = {
  id: "sales",
  title: "Sales Intelligence",
  description: "Revenue trends and regional performance",
  allowedRoles: ["owner", "admin", "manager", "analyst"],
  category: "finance",
  defaultLayout: {
    i: "sales",
    x: 0,
    y: 0,
    w: 8,
    h: 9,
    minW: 4,
    minH: 6,
  },
};

