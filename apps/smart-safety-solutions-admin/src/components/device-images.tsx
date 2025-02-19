import { SortOrder, useFetchAlarmsQuery } from "@smart-safety-solutions/apis";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@smart-safety-solutions/components";
import { thirtyDaysAgo } from "@smart-safety-solutions/utils";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import Modal from "./modal";

const DeviceImages: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { data: { data: alarms = [] } = { data: [] } } = useFetchAlarmsQuery(
    {
      page: 0,
      pageSize: 20,
      sortProperty: "createdTime",
      sortOrder: SortOrder.DESC,
      startTime: thirtyDaysAgo,
      // typeList: alarmTypes,
      // statusList: alarmStatuses,
    },
    { pollingInterval: 10000, skipPollingIfUnfocused: true }
  );

  /**
   * Sets the current image and opens the image modal.
   */
  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Image
          alt="alert-image"
          src={`data:image/jpeg;base64,${selectedImage}`}
          width={0}
          height={0}
          style={{ width: "auto", height: "100%" }}
        />
      </Modal>

      {alarms.map((alarm) => {
        return (
          <>
            <Card
              key={`alarm-${alarm.id.id}`}
              className="flex justify-between flex-col border-gray-300 cursor-pointer"
              onClick={() => handleOpenModal(alarm.details.image)}
            >
              <CardContent className="p-2.5 pt-2.5 pb-0">
                <Image
                  alt="alert-image"
                  src={`data:image/jpeg;base64,${alarm.details.image}`}
                  width={0}
                  height={0}
                  style={{ width: "200px", height: "100%" }}
                />
              </CardContent>

              <CardFooter className="p-2.5 pb-2.5">
                <CardDescription>
                  {alarm.readableDate}, {alarm.readableTime}
                </CardDescription>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default DeviceImages;
