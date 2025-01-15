'use_client';
import { FunctionComponent } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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

const AlertsGraph: FunctionComponent = () => {
  const { data = { data: [] } } = useFetchNotificationsQuery();

  console.log('notifications: ', data.data);

  // construct array of last 30 days with default alert value of 0
  const last30DaysArr = Array.from({ length: 30 }, (_, i) => {
    const today = dayjs();
    const currentDay = today.subtract(i, 'days');
    const readableDate = currentDay.format('MMM Do');

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
    const {
      readableDate,
      info: { action },
    } = item;

    if (action === 'created') result[readableDate] += 1;

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
