"use client";

import { ReactNode, useEffect, useState } from "react";

import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { NotificationContext } from "@src/common/globals/Contexts";
import { getSocket } from "@src/common/globals/socket";
import { setNotificationData, useDispatch } from "@src/lib/redux";
import { getAccessToken } from "@src/lib/tools/localStorage/token";
import { ChangedStatusOrdersNotification } from "@src/types/changedStatusOrderNotificationBody";
import { NotificationData } from "@src/types/notificationData";

type OrdersLayoutProps = {
  children: ReactNode;
};

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const dispatch = useDispatch();
  const [notifyData, setNotifyData] =
    useState<ChangedStatusOrdersNotification | null>(null);

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

    const onNotification = (
      data: NotificationData | ChangedStatusOrdersNotification,
    ) => {
      if (data.type !== NotificationTypeEnum.ORDER_STATUS_UPDATED) {
        dispatch(setNotificationData(data as NotificationData));
        localStorage.setItem("notificationData", JSON.stringify(data));
      } else {
        setNotifyData(data as ChangedStatusOrdersNotification);
      }
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

  return (
    <NotificationContext.Provider value={notifyData}>
      {children}
    </NotificationContext.Provider>
  );
}
