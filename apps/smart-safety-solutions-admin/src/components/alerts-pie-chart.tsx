"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@smart-safety-solutions/components";

const chartData = [
  { alarmType: "attached", count: 100, fill: "var(--color-attached)" },
  // { alarmType: "inconclusive", count: 20, fill: "var(--color-inconclusive)" },
  { alarmType: "unattached", count: 5, fill: "var(--color-unattached)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  attached: {
    label: "Attached",
    color: "hsl(var(--chart-2))",
  },
  // inconclusive: {
  //   label: "Inconclusive",
  //   color: "hsl(var(--chart-4))",
  // },
  unattached: {
    label: "Unattached",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const AlertsPieChart = () => {
  const totalAttached = React.useMemo(() => {
    return chartData.reduce((acc, curr) => {
      if (curr.alarmType === "attached") {
        return acc + curr.count;
      }

      return acc;
    }, 0);
  }, []);

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
  }, []);

  const attachedPercentage = Math.floor((totalAttached / totalCount) * 100);

  return (
    <Card className="flex flex-col border-none shadow-none min-w-[360px]">
      <CardHeader className="items-center pb-0 w-full">
        <CardTitle>Attached harness rate</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="alarmType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {attachedPercentage}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AlertsPieChart;
