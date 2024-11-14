import "./SnackBar.scss";
import { HideNotification } from "stores/NotificationReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function GetIcon(notification_type: string) {
  switch (notification_type) {
    case "success":
      return "mi-circle-check";
    case "error":
      return "mi-circle-error";
    default:
      return "mi-circle-info";
  }
}

export default function SnackBar() {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.notification);

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(HideNotification());
      }, 3000 + notification.message.length * 20);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <div id="SnackBar" className={notification.visible ? "show" : "hide"}>
      <div className={`notification-window ${notification.notification_type}`}>
        <Icon icon={GetIcon(notification.notification_type)} id={"icon"} />
        <p className="notification">{notification.message}</p>
      </div>
    </div>
  );
}
