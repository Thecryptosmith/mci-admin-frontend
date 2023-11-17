/* Core */
import { createLogger } from "redux-logger";

import { adminApi } from "@src/lib/redux/services/adminApi";

const middleware = [
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: () => "#139BFE",
      prevState: () => "#1C5FAF",
      action: () => "#149945",
      nextState: () => "#A47104",
      error: () => "#ff0005",
    },
    predicate: () => typeof window !== "undefined",
  }),
  adminApi.middleware,
];

export { middleware };
