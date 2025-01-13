'use_client';
import { FunctionComponent } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
} from '@smart-safety-solutions/components';
import dayjs from 'dayjs';
import { useFetchNotificationsQuery } from '@smart-safety-solutions/apis';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

type ChartData = Array<{
  readonly date: string;
  readonly alerts: number;
}>;

const chartConfig: ChartConfig = {
  alerts: {
    label: 'Alerts',
  },
};

const AlarmsGraph: FunctionComponent = () => {
  const { data = { data: [] } } = useFetchNotificationsQuery();

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const today = dayjs();
    const currentDay = today.subtract(i, 'days');
    const readableDate = currentDay.format('MMM Do');

    return {
      [readableDate]: 0,
    };
  });

  const alertsByDayInitial = last30Days.reduce((result, item) => {
    const entries = Object.entries(item);
    const [key, value] = entries[0];

    result[key] = value;

    return result;
  }, {});

  const alertsByDay = data.data.reduce((result, item) => {
    const {
      readableDate,
      info: { action },
    } = item;

    if (action === 'created') result[readableDate] += 1;

    return result;
  }, alertsByDayInitial);

  const chartData = Object.entries(alertsByDay).reduce(
    (result: ChartData, [date, alerts]) => {
      return [...result, { date, alerts }];
    },
    []
  );

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          Showing missed harness alerts for the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-80 min-w-full">
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
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="alerts"
              type="linear"
              fill="#f87171"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AlarmsGraph;
