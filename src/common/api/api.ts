import axios from "axios";

import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import { globalRouter } from "@src/common/globals/globalRouter";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@src/lib/tools/localStorage/token";

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

api.interceptors.request.use(async (request) => {
  const accessToken = getAccessToken();

  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (
      (response.status === 403 || response.status === 401) &&
      response.data.message === "Unauthorized" &&
      !config.isRetry
    ) {
      config.isRetry = true;

      try {
        const refreshToken = getRefreshToken();

        const { data } = await axios.post<{
          accessToken: string;
        }>(
          `${baseApiUrl}/auth/refresh-access-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        setAccessToken(data.accessToken);

        return api(config);
      } catch {
        globalRouter.push("/auth/sign-in");
        return;
      }
    }

    throw error;
  },
);

export { api };
