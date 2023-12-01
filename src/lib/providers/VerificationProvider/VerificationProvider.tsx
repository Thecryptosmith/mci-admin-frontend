"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { FullScreenLoader } from "@src/app/components/FullScreenLoader/FullScreenLoader";
import { NotificationTypeEnum } from "@src/common/emuns/NotificationTypeEnum";
import { injectRouter } from "@src/common/globals/globalRouter";
import {
  selectCurrentUser,
  setUser,
  useDispatch,
  useSelector,
} from "@src/lib/redux";
import { useSendReviewingNotificationMutation } from "@src/lib/redux/services/adminApi";
import {
  getAccessToken,
  getRefreshToken,
} from "@src/lib/tools/localStorage/token";

const authPaths = ["/auth/sign-in"];

type Props = {
  children: ReactNode;
};

export const VerificationProvider = (props: Props) => {
  const { children } = props;

  const [sendReviewingNotification] = useSendReviewingNotificationMutation();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const router = useRouter();
  injectRouter(router);
  const path = usePathname();
  const [isInit, setIsInit] = useState(false);
  const [pathName, setPathName] = useState("");

  useLayoutEffect(() => {
    setPathName(localStorage.getItem("prevPath") ?? "");
  }, []);

  useEffect(() => {
    setPathName((prevPath) => {
      const isReviewingPrevPath =
        prevPath.startsWith("/orders/exchange/") ||
        prevPath.startsWith("/orders/buy/") ||
        prevPath.startsWith("/orders/sell/");

      let orderId = 0;

      if (isReviewingPrevPath) {
        const pathParts = prevPath.split("/");

        orderId = Number(pathParts[pathParts.length - 1]);
      }

      const notificationData = JSON.parse(
        localStorage.getItem("notificationData") ?? "{}",
      );

      if (
        isReviewingPrevPath &&
        notificationData?.body?.[orderId]?.reviewingEmail ===
          localStorage.getItem("email")
      ) {
        sendReviewingNotification({
          id: orderId,
          reviewingNotificationType:
            NotificationTypeEnum.FINISH_REVIEWING_ORDER,
        });
      }

      localStorage.setItem("prevPath", prevPath);

      return path;
    });
  }, [path]);

  useLayoutEffect(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const email = localStorage.getItem("email") ?? "";

    if (accessToken && refreshToken) {
      dispatch(setUser({ accessToken, refreshToken, email }));
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken && !authPaths.includes(path)) {
      router.push("/auth/sign-in");
      setIsInit(true);
      return;
    }

    if (!accessToken && authPaths.includes(path)) {
      setIsInit(true);
      return;
    }

    (async function () {
      if (path.startsWith("/auth/")) {
        setIsInit(true);
        router.push("/dashboard");

        return;
      }

      setIsInit(true);
    })();
  }, [currentUser, path]);

  if (!isInit) {
    return <FullScreenLoader />;
  }

  return children;
};
