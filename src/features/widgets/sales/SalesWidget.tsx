import { memo, useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSalesWidgetQuery } from "@/features/widgets/sales/sales.hook";
import type { SalesRecord } from "@/features/widgets/sales/sales.types";
import type { WidgetRuntimeProps } from "@/types/widget.types";

const columnHelper = createColumnHelper<SalesRecord>();

const SALES_COLUMNS = [
  columnHelper.accessor("region", {
    header: "Region",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor("marginPct", {
    header: "Margin",
    cell: (info) => `${info.getValue().toFixed(1)}%`,
  }),
];

const SalesWidgetComponent = (_props: WidgetRuntimeProps) => {
  const { data, isLoading, isError } = useSalesWidgetQuery();
  const tableData = useMemo(() => data?.records ?? [], [data]);

  const table = useReactTable({
    data: tableData,
    columns: SALES_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading sales data...</div>;
  }

  if (isError || !data) {
    return <div className="flex h-full items-center justify-center text-sm text-destructive">Sales data unavailable.</div>;
  }

  return (
    <Card className="h-full gap-4 p-0">
      <CardHeader className="px-4 pt-4">
        <CardTitle>Sales Intelligence</CardTitle>
        <CardDescription>Revenue trend and regional margin mix</CardDescription>
      </CardHeader>
      <CardContent className="grid h-full grid-cols-1 gap-4 px-4 pb-4 lg:grid-cols-2">
        <div className="h-64 rounded-md border p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeseries}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={48} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="orders" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-md border p-3">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export const SalesWidget = memo(SalesWidgetComponent);

