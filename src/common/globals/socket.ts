import * as process from "process";
import { io } from "socket.io-client";

import { getAccessToken } from "@src/lib/tools/localStorage/token";

export const getSocket = () => {
  return io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "", {
    auth: { token: getAccessToken() },
    extraHeaders: {
      "ngrok-skip-browser-warning": "69420",
    },
  });
};
