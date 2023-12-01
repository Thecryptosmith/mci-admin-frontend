import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { MutationTrigger } from "@reduxjs/toolkit/src/query/react/buildHooks";

import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { useSendReviewingNotificationMutation } from "@src/lib/redux/services/adminApi";
import { SendReviewingNotificationReqPayload } from "@src/types/sendReviewingNotificationReqPayload";

const initBeforeUnLoad = (
  showExitPrompt: boolean,
  path: string,
  callback?: MutationTrigger<
    MutationDefinition<
      SendReviewingNotificationReqPayload,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "Admin",
      void,
      "adminApi"
    >
  >,
) => {
  const isReviewingPrevPath =
    path.startsWith("/orders/exchange/") ||
    path.startsWith("/orders/buy/") ||
    path.startsWith("/orders/sell/");

  window.onbeforeunload = () => {
    if (showExitPrompt && isReviewingPrevPath) {
      console.log("action before unmount");

      let orderId = 0;

      if (isReviewingPrevPath) {
        const pathParts = path.split("/");

        orderId = Number(pathParts[pathParts.length - 1]);
      }

      console.log("before callback");
      if (callback) {
        return callback({
          id: orderId,
          reviewingNotificationType:
            NotificationTypeEnum.FINISH_REVIEWING_ORDER,
        });
      }
    }
  };
};

// Hook
export default function useExitPrompt(bool: boolean) {
  const path = usePathname();
  const [sendReviewingNotification] = useSendReviewingNotificationMutation();

  const [showExitPrompt, setShowExitPrompt] = useState(bool);

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt, path);
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt, path, sendReviewingNotification);
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt] as [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
}
