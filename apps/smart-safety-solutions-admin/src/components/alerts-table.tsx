import {
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

const alarmTypeOptions = [
  {
    value: AlarmType.UNATTACHED,
    label: "UNATTACHED",
  },
  {
    value: AlarmType.ATTACHED,
    label: "ATTACHED",
  },
  {
    value: AlarmType.INCONCLUSIVE,
    label: "INCONCLUSIVE",
  },
];

const AlertsTable: FunctionComponent = () => {
  const { setisAlertsSheetOpen, setSelectedAlert } = useContext(AppContext);

  const [alarmTypes, setAlarmTypes] = useState([alarmTypeOptions[0].value]);

  const thirtyDaysAgo = useMemo(() => utils.thirtyDaysAgo, []);
  const { data: { data: alarmData = [] } = { data: [] } } = useFetchAlarmsQuery(
    {
      page: 0,
      pageSize: 1000,
      sortProperty: "createdTime",
      sortOrder: SortOrder.ASC,
      startTime: thirtyDaysAgo,
      typeList: alarmTypes,
    }
  );

  console.log(
    "alarms: ",
    alarmData
      .map((a) => {
        if (a.type === "No Harness") {
          return null;
        }

        return a.type;
      })
      .filter((a) => !!a)
  );

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
  const handleSetAlarmTypes = (value: string[]): void => {
    if (!value.length) {
      setAlarmTypes([alarmTypeOptions[0].value]);
    }

    setAlarmTypes(value);
  };

  if (!alarmData.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-2">
        <MultiSelect
          value={alarmTypes}
          options={alarmTypeOptions}
          onSetValue={handleSetAlarmTypes}
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
          {[...alarmData].reverse().map((alarm) => {
            return (
              <TableRow
                key={`formatted-alert-${alarm.id.id}`}
                className="cursor-pointer"
                onClick={() => handleOpenAlertsSheet(alarm.id.id)}
              >
                <TableCell>
                  {alarm.readableDate}, {alarm.readableTime}
                </TableCell>
                <TableCell>{alarm.type}</TableCell>
                <TableCell>{alarm.originatorName}</TableCell>
                <TableCell>
                  {alarm.originatorLabel.replace("Cam id:", "")}
                </TableCell>
                <TableCell className="text-right w-[200px]">
                  {alarm.acknowledged ? (
                    <span className="text-green-500 font-semibold">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">PENDING</span>
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
