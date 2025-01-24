import { SortOrder, useFetchAlarmsQuery } from '@smart-safety-solutions/apis';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@smart-safety-solutions/components';
import dayjs from 'dayjs';
import { FunctionComponent, useContext, useMemo } from 'react';
import AppContext from '../contexts/app/context';

const AlertsTable: FunctionComponent = () => {
  const { setisAlertsSheetOpen } = useContext(AppContext);

  const thirtyDaysAgo = useMemo(
    () => dayjs().subtract(30, 'days').valueOf(),
    []
  );
  const { data: { data: alarmData = [] } = { data: [] } } = useFetchAlarmsQuery(
    {
      page: 0,
      pageSize: 1000,
      sortProperty: 'createdTime',
      sortOrder: SortOrder.ASC,
      startTime: thirtyDaysAgo,
    }
  );

  /**
   * Opens the alert detail sheet.
   */
  const handleOpenAlertsSheet = () => {
    setisAlertsSheetOpen(true);
  };

  if (!alarmData.length) {
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
        {[...alarmData].reverse().map((alarm) => {
          return (
            <TableRow
              key={`formatted-alert-${alarm.id.id}`}
              className="cursor-pointer"
              onClick={handleOpenAlertsSheet}
            >
              <TableCell>{alarm.readableDate}</TableCell>
              <TableCell>{alarm.originatorName}</TableCell>
              <TableCell>
                {alarm.originatorLabel.replace('Cam id:', '')}
              </TableCell>
              <TableCell className="text-right w-[200px]">
                {alarm.acknowledged ? (
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
