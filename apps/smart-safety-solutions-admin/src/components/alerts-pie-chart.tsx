"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@smart-safety-solutions/components";
import {
  AlarmType,
  useFetchAlarmsCountQuery,
} from "@smart-safety-solutions/apis";
import { thirtyDaysAgo } from "@smart-safety-solutions/utils";

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
};

const AlertsPieChart = () => {
  const { data: attachedAlarmsCount = 0, isLoading: isAttachedAlarmsLoading } =
    useFetchAlarmsCountQuery({
      typeList: [AlarmType.ATTACHED],
      startTs: thirtyDaysAgo,
    });
  const {
    data: unattachedAlarmsCount = 0,
    isLoading: isUnattachedAlarmsLoading,
  } = useFetchAlarmsCountQuery({
    typeList: [AlarmType.UNATTACHED],
    startTs: thirtyDaysAgo,
  });

  const chartData = [
    {
      alarmType: "attached",
      count: attachedAlarmsCount,
      fill: "var(--color-attached)",
    },
    // { alarmType: "inconclusive", count: 20, fill: "var(--color-inconclusive)" },
    {
      alarmType: "unattached",
      count: unattachedAlarmsCount,
      fill: "var(--color-unattached)",
    },
  ];
  const totalAlarmsCount = attachedAlarmsCount + unattachedAlarmsCount;

  const attachedPercentage = Math.floor(
    (attachedAlarmsCount / totalAlarmsCount) * 100
  );

  const isLoading = isAttachedAlarmsLoading || isUnattachedAlarmsLoading;

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
          {!isLoading ? (
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
          ) : (
            <div />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AlertsPieChart;
