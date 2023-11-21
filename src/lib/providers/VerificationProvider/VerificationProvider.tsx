"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { FullScreenLoader } from "@src/app/components/FullScreenLoader/FullScreenLoader";
import { injectRouter } from "@src/common/globals/globalRouter";
import { setUser, useDispatch } from "@src/lib/redux";
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

  const dispatch = useDispatch();

  const router = useRouter();
  injectRouter(router);
  const pathname = usePathname();
  const [isInit, setIsInit] = useState(false);

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

    if (!accessToken && !authPaths.includes(pathname)) {
      router.push("/auth/sign-in");
      setIsInit(true);
      return;
    }

    if (!accessToken && authPaths.includes(pathname)) {
      setIsInit(true);
      return;
    }

    (async function () {
      if (pathname.startsWith("/auth/")) {
        setIsInit(true);
        router.push("/dashboard");

        return;
      }

      setIsInit(true);
    })();
  }, []);

  if (!isInit) {
    return <FullScreenLoader />;
  }

  return children;
};
