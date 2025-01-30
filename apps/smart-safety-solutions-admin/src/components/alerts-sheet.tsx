"use client";
import {
  Button,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@smart-safety-solutions/components";
import { FunctionComponent, useContext, useState } from "react";
import AppContext from "../contexts/app/context";
import {
  useAcknowledgAlarmMutation,
  useFetchAlarmQuery,
} from "@smart-safety-solutions/apis";
import { Map, Marker } from "pigeon-maps";
import Modal from "./modal";
import Image from "next/image";

const AlertsSidebar: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const markerPosition: [number, number] = [
    alert.details.latitude,
    alert.details.longitude,
  ];

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Image
          alt="alert-image"
          src={`data:image/jpeg;base64,${alert.details.image}`}
          width={0}
          height={0}
          style={{ width: "auto", height: "100%" }}
        />
      </Modal>

      <SheetContent
        className="flex flex-col w-full sm:max-w-[580px] gap-4"
        onClose={() => setisAlertsSheetOpen(false)}
      >
        <SheetHeader>
          <SheetTitle>
            {alert.readableDate}, {alert.readableTime}
            <p className="text-gray-600 text-large font-semibold">
              Missing harness alert
            </p>
          </SheetTitle>

          <div className="flex flex-col">
            <SheetDescription className="mt-none leading-7">
              <strong>Employee: </strong>
              {alert.originatorName}
            </SheetDescription>
            <SheetDescription className="leading-7">
              <strong>Device: </strong>
              {alert.originatorLabel.replace("Cam id: ", "")}
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex flex-row gap-2">
          <div
            className="flex flex-1 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundImage: `url("data:image/jpeg;base64,${alert.details.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-1">
            <Map height={480} defaultCenter={markerPosition} defaultZoom={14}>
              <Marker width={50} anchor={markerPosition} />
            </Map>
          </div>
        </div>

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
    </>
  );
};

export default AlertsSidebar;
