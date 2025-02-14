"use_client";
import { FunctionComponent, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import dayjs from "dayjs";
import {
  AlarmType,
  SortOrder,
  useFetchAlarmsQuery,
} from "@smart-safety-solutions/apis";
import * as utils from "@smart-safety-solutions/utils";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

type ChartData = Array<{
  readonly date: string;
  readonly alerts: number;
}>;

const chartConfig: ChartConfig = {
  alerts: {
    label: "Alerts",
  },
};

const AlertsGraph: FunctionComponent = () => {
  const thirtyDaysAgo = useMemo(() => utils.thirtyDaysAgo, []);
  const { data = { data: [] } } = useFetchAlarmsQuery({
    page: 0,
    pageSize: 1000,
    sortProperty: "createdTime",
    sortOrder: SortOrder.DESC,
    startTime: thirtyDaysAgo,
    typeList: [AlarmType.UNATTACHED],
  });

  console.log("graph data: ", data);

  // construct array of last 30 days with default alert value of 0
  const last30DaysArr = Array.from({ length: 30 }, (_, i) => {
    const today = dayjs();
    const currentDay = today.subtract(i, "days");
    const readableDate = currentDay.format("MMM Do");

    return {
      [readableDate]: 0,
    };
  });

  // convert date array to object with date as key
  const last30DaysObj = last30DaysArr.reduce((result, item) => {
    const entries = Object.entries(item);
    const [key, value] = entries[0];

    result[key] = value;

    return result;
  }, {});

  // iterate through alert data and update date object with alert values
  const alertsByDay = data.data.reduce((result, item) => {
    const { readableDate } = item;

    result[readableDate] += 1;

    return result;
  }, last30DaysObj);

  // convert alert data object to array for chart
  const chartData = Object.entries(alertsByDay).reduce(
    (result: ChartData, [date, alerts]) => {
      return [...result, { date, alerts }];
    },
    []
  );

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Unattached harness alerts</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-64 min-w-full">
          <AreaChart
            accessibilityLayer
            className="overflow-visible"
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} reversed />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideIndicator />}
            />
            <Area
              dataKey="alerts"
              type="linear"
              fill="#f87171"
              fillOpacity={0.4}
              stroke="#fca5a5"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AlertsGraph;
