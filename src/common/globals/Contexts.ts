import { createContext } from "react";

import { ChangedStatusOrdersNotification } from "@src/types/changedStatusOrderNotificationBody";

export const NotificationContext =
  createContext<ChangedStatusOrdersNotification | null>(null);
