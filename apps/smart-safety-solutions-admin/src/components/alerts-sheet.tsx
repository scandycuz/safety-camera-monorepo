"use client";
import {
  Button,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@smart-safety-solutions/components";
import { FunctionComponent, useContext } from "react";
import AppContext from "../contexts/app/context";
import {
  useAcknowledgAlarmMutation,
  useFetchAlarmQuery,
} from "@smart-safety-solutions/apis";
import { Map, Marker } from "pigeon-maps";

const AlertsSidebar: FunctionComponent = () => {
  const {
    state: { selectedAlert },
    setisAlertsSheetOpen,
  } = useContext(AppContext);

  const { data: alert } = useFetchAlarmQuery(selectedAlert, {
    skip: !selectedAlert,
  });

  const [markAlertAsResolved] = useAcknowledgAlarmMutation();

  if (!alert) {
    return null;
  }

  const handleClose = () => {
    setisAlertsSheetOpen(false);
  };

  const markerPosition: [number, number] = [
    alert.details.latitude,
    alert.details.longitude,
  ];

  return (
    <SheetContent
      className="flex flex-col w-full sm:max-w-[580px] gap-5"
      onClose={handleClose}
    >
      <SheetHeader>
        <SheetTitle>
          {alert.readableDate}, {alert.readableTime}
          <p className="text-gray-600 text-large font-semibold">
            Missing harness alert
          </p>
        </SheetTitle>

        <SheetDescription className="flex flex-col gap-4">
          <div className="leading-6">
            <p>
              <strong>Employee: </strong>
              {alert.originatorName}
            </p>
            <p>
              <strong>Device: </strong>
              {alert.originatorLabel.replace("Cam id: ", "")}
            </p>
          </div>
        </SheetDescription>
      </SheetHeader>

      <Map height={240} defaultCenter={markerPosition} defaultZoom={14}>
        <Marker width={50} anchor={markerPosition} />
      </Map>

      <SheetFooter className="flex flex-row justify-between sm:justify-between items-center min-h-[2.25rem]">
        <div>
          <span className="font-lg">Status: </span>
          {alert.acknowledged ? (
            <span className="text-green-500 font-semibold">RESOLVED</span>
          ) : (
            <span className="text-red-500 font-semibold">PENDING</span>
          )}
        </div>

        {!alert.acknowledged && (
          <Button onClick={() => markAlertAsResolved(alert.id.id)}>
            Mark as resolved
          </Button>
        )}
      </SheetFooter>
    </SheetContent>
  );
};

export default AlertsSidebar;
