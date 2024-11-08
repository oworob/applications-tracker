import { HideNotification } from "stores/NotificationReducer";
import "./SnackBar.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

export default function SnackBar() {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.notification);

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(HideNotification());
      }, 3000 + notification.message.length * 50);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <div id="SnackBar" className={notification.visible ? "show" : "hide"}>
      <div className={`notification-window ${notification.notification_type}`}>
        {notification.notification_type === "success" && <Icon icon="mi-circle-check" />}
        {notification.notification_type === "error" && <Icon icon="mi-circle-error" />}
        <p className={`notification ${notification.notificationType}`}>{notification.message}</p>
      </div>
    </div>
  );
}
