import { useQuery } from "@tanstack/react-query";
import { salesService } from "@/features/widgets/sales/sales.service";

export const SALES_QUERY_KEY = ["widgets", "sales"] as const;

export const useSalesWidgetQuery = () =>
  useQuery({
    queryKey: SALES_QUERY_KEY,
    queryFn: () => salesService.fetchSalesWidgetData(),
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 15,
  });

