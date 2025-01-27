import dayjs from "dayjs";
import { Alarm, ApiAlarm, ApiNotification, Notification } from "./types";

export const transformApiAlarm = (resp: ApiAlarm): Alarm => {
  const parsedDate = dayjs(resp.createdTime);
  const readableDate = parsedDate.format("MMM Do");
  const readableTime = parsedDate.format("hh:mm:ss A");

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
  const readableTime = parsedDate.format("hh:mm:ss A");

  return {
    ...notification,
    readableDate,
    readableTime,
  };
};
