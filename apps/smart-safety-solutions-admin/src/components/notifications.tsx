import {
  SortOrder,
  useFetchAlarmsQuery,
  useFetchNotificationsQuery,
  useReadNotificationMutation,
} from "@smart-safety-solutions/apis";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@smart-safety-solutions/components";
import { SquareArrowOutUpRight } from "lucide-react";
import { Bell } from "lucide-react";
import { FunctionComponent, useContext } from "react";
import AppContext from "../contexts/app/context";
import { cn } from "packages/components/src/lib/utils";

const Notifications: FunctionComponent = () => {
  const { setisAlertsSheetOpen, setSelectedAlert } = useContext(AppContext);

  const [markAsRead] = useReadNotificationMutation();

  const { data: { data: alarms } = {} } = useFetchAlarmsQuery({
    pageSize: 50,
    page: 0,
    sortProperty: "createdTime",
    sortOrder: SortOrder.DESC,
  });

  const { data: { data: notifications } = {} } = useFetchNotificationsQuery({
    pageSize: 50,
    page: 0,
    sortProperty: "createdTime",
    sortOrder: SortOrder.DESC,
  });

  if (!notifications || !alarms) {
    return null;
  }

  // filter for only notifications for created and unresolved alarms
  const formattedNotifications = notifications
    .map((notification) => {
      const notificationAlarm = alarms?.find((alarm) => {
        return notification.info.alarmId === alarm.id.id;
      });

      return { ...notification, alarm: notificationAlarm };
    })
    .filter((notification) => {
      const isCreated = notification.info.action === "created";
      const isUnresolved = !notification.alarm?.acknowledged;

      return isCreated && isUnresolved;
    });

  const notificationCount = formattedNotifications.filter((notification) => {
    return notification.status !== "READ";
  }).length;

  const truncatedNotifications = formattedNotifications.slice(0, 8);

  /**
   * Selects the alert for the notification and opens the alert side sheet.
   * TODO: Look into shadcn bug where clicking notifications more than twice
   * disables all clicks (using timeout resolves issue).
   */
  const handleClickNotification = (notificationId: string, alarmId: string) => {
    setTimeout(() => {
      markAsRead(notificationId);
      setSelectedAlert(alarmId);
      setisAlertsSheetOpen(true);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <Button variant="outline">
          {!!notificationCount && (
            <Badge className="absolute -top-2 -left-2" variant="destructive">
              {notificationCount}
            </Badge>
          )}
          <Bell />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {truncatedNotifications.length ? (
            truncatedNotifications.map((notification, idx) => {
              return (
                <DropdownMenuItem
                  key={`notification-${idx}`}
                  className={cn(
                    "cursor-pointer",
                    notification.status === "READ"
                      ? "opacity-50"
                      : "opacity-100"
                  )}
                  onClick={() =>
                    handleClickNotification(
                      notification.id.id,
                      notification.info.alarmId
                    )
                  }
                >
                  <div className="flex flex-1 flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold">
                        {notification.readableDate} {notification.readableTime}
                      </div>
                      <div className="font-medium">Missed harness</div>
                    </div>

                    <SquareArrowOutUpRight />
                  </div>
                </DropdownMenuItem>
              );
            })
          ) : (
            <DropdownMenuItem>
              <div className="opacity-80">No current notifications</div>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
