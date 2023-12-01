"use client";

import { ReactNode, useEffect } from "react";

import { getSocket } from "@src/common/globals/socket";
import { setNotificationData, useDispatch } from "@src/lib/redux";
import { getAccessToken } from "@src/lib/tools/localStorage/token";
import { NotificationData } from "@src/types/notificationData";

type OrdersLayoutProps = {
  children: ReactNode;
};

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const dispatch = useDispatch();

  // socket
  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return;
    }

    const socket = getSocket();

    const onConnect = () => {
      console.log("WS Connected");
    };

    const onError = () => {
      console.log("WS Error");
    };

    const onNotification = (data: NotificationData) => {
      console.log("onNotification log");
      dispatch(setNotificationData(data));
      localStorage.setItem("notificationData", JSON.stringify(data));
    };

    socket.on("connect", onConnect);
    socket.on("notification", onNotification);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("notification", onNotification);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
