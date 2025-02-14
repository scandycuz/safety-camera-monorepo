import dayjs from "dayjs";
import {
  Alarm,
  ApiAlarm,
  ApiDevice,
  ApiNotification,
  Device,
  Notification,
} from "./types";

export const transformApiAlarm = (resp: ApiAlarm): Alarm => {
  const parsedDate = dayjs(resp.createdTime);
  const readableDate = parsedDate.format("MMM Do");
  const readableTime = parsedDate.format("h:mm:ss A");

  return {
    ...resp,
    readableDate,
    readableTime,
    details: {
      ...resp.details,
      latitude: parseFloat(resp.details.latitude),
      longitude: parseFloat(resp.details.longitude),
    },
  };
};

export const transformApiNotificiation = (
  notification: ApiNotification
): Notification => {
  const parsedDate = dayjs(notification.createdTime);
  const readableDate = parsedDate.format("MMM Do");
  const readableTime = parsedDate.format("h:mm:ss A");

  return {
    ...notification,
    readableDate,
    readableTime,
  };
};

export const transformApiDevice = (device: ApiDevice): Device => {
  const parsedDate = dayjs(device.createdTime);
  const readableDate = parsedDate.format("MMM Do");
  const readableTime = parsedDate.format("h:mm:ss A");

  return {
    ...device,
    readableDate,
    readableTime,
  };
};
