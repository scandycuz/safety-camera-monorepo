import {
  Device,
  Notification,
  useFetchDevicesQuery,
  useFetchNotificationsQuery,
  useFetchUserProfileQuery,
} from '@smart-safety-solutions/apis';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@smart-safety-solutions/components';
import { SessionContext } from '@smart-safety-solutions/contexts';
import { FunctionComponent, useContext } from 'react';

const AlertsTable: FunctionComponent = () => {
  const {
    state: { userId },
  } = useContext(SessionContext);

  const { data: profileData } = useFetchUserProfileQuery(userId, {
    skip: !userId,
  });
  const { data: { data: deviceData } = { data: [] } } = useFetchDevicesQuery(
    { customerId: profileData?.customerId?.id || '' },
    { skip: !profileData }
  );
  const { data: { data: notificationData } = { data: [] } } =
    useFetchNotificationsQuery();

  const deviceObj = deviceData.reduce<Record<string, Device>>((res, device) => {
    res[device.id.id] = device;

    return res;
  }, {});

  const isCreated = (item: Notification) => item.info.action === 'created';
  const formattedAlerts = notificationData
    .filter(isCreated)
    .map((notification) => {
      return {
        ...notification,
        device: deviceObj[notification.info.alarmOriginator.id],
      };
    });

  if (!deviceData.length || !notificationData.length) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Device ID</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formattedAlerts.map((alert) => {
          return (
            <TableRow key={`formatted-alert-${alert.id.id}`}>
              <TableCell>{alert.readableDate}</TableCell>
              <TableCell>{alert.device.name}</TableCell>
              <TableCell>{alert.device.label.replace('Cam id:', '')}</TableCell>
              <TableCell className="text-right w-[200px]">
                {alert.status === 'READ' ? (
                  <span className="text-green-500 font-semibold">RESOLVED</span>
                ) : (
                  <span className="text-red-500">PENDING RESOLUTION</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AlertsTable;
