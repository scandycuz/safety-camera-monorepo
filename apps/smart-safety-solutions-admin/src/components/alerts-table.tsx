import {
  AlarmStatus,
  AlarmType,
  SortOrder,
  useFetchAlarmsQuery,
} from "@smart-safety-solutions/apis";
import {
  MultiSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@smart-safety-solutions/components";
import * as utils from "@smart-safety-solutions/utils";
import { FunctionComponent, useContext, useMemo, useState } from "react";
import AppContext from "../contexts/app/context";
import { cn } from "packages/components/src/lib/utils";

const alarmTypeOptions = [
  {
    value: AlarmType.UNATTACHED,
    label: "Unattached",
  },
  {
    value: AlarmType.ATTACHED,
    label: "Attached",
  },
  {
    value: AlarmType.INCONCLUSIVE,
    label: "Inconclusive",
  },
];

const alarmStatusOptions = [
  {
    value: AlarmStatus.ACK,
    label: "Acknowledged",
  },
  {
    value: AlarmStatus.UNACK,
    label: "Pending",
  },
];

const AlertsTable: FunctionComponent = () => {
  const { setisAlertsSheetOpen, setSelectedAlert } = useContext(AppContext);

  const [alarmTypes, setAlarmTypes] = useState([alarmTypeOptions[0].value]);
  const [alarmStatuses, setAlarmStatuses] = useState(
    alarmStatusOptions.map(({ value }) => value)
  );

  const thirtyDaysAgo = useMemo(() => utils.thirtyDaysAgo, []);
  const { data: { data: alarmData = [] } = { data: [] } } = useFetchAlarmsQuery(
    {
      page: 0,
      pageSize: 1000,
      sortProperty: "createdTime",
      sortOrder: SortOrder.DESC,
      startTime: thirtyDaysAgo,
      typeList: alarmTypes,
      statusList: alarmStatuses,
    }
  );

  console.log("data: ", alarmData);

  /**
   * Opens the alert detail sheet.
   */
  const handleOpenAlertsSheet = (alertId: string) => {
    setSelectedAlert(alertId);
    setisAlertsSheetOpen(true);
  };

  /**
   * Sets the value for the alarm type dropdown.
   *
   * @param value an array of alarm type values
   */
  const handleSetAlarmTypes = (value: Array<string>): void => {
    // prevent removing last remaining option
    if (!value.length) {
      return;
    }

    setAlarmTypes(value as Array<AlarmType>);
  };

  const handleSetAlarmStatuses = (value: Array<string>): void => {
    // prevent removing last remaining option
    if (!value.length) {
      return;
    }

    setAlarmStatuses(value as Array<AlarmStatus>);
  };

  if (!alarmData.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-2 flex flex-row gap-8 items-center">
        <MultiSelect
          className="w-[380px]"
          title="Type"
          value={alarmTypes}
          options={alarmTypeOptions}
          onSetValue={handleSetAlarmTypes}
        />
        <MultiSelect
          className="w-[274px]"
          title="Status"
          value={alarmStatuses}
          options={alarmStatusOptions}
          onSetValue={handleSetAlarmStatuses}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Device ID</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alarmData.map((alarm) => {
            return (
              <TableRow
                key={`formatted-alert-${alarm.id.id}`}
                className="cursor-pointer"
                onClick={() => handleOpenAlertsSheet(alarm.id.id)}
              >
                <TableCell>
                  {alarm.readableDate}, {alarm.readableTime}
                </TableCell>
                <TableCell>
                  {alarm.type === AlarmType.ATTACHED
                    ? "Attached"
                    : "Unattached"}
                </TableCell>
                <TableCell>{alarm.originatorName}</TableCell>
                <TableCell>
                  {alarm.originatorLabel.replace("Cam id:", "")}
                </TableCell>
                <TableCell className="text-right w-[200px]">
                  {alarm.acknowledged ? (
                    <span className="text-green-500 font-semibold">
                      ACKNOWLEDGED
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "font-semibold",
                        alarm.type === AlarmType.ATTACHED
                          ? "text-yellow-500"
                          : "text-red-500"
                      )}
                    >
                      PENDING
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertsTable;
