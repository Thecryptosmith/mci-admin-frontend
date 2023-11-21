import { adminApi } from "@src/lib/redux/services/adminApi";
import { authApi } from "@src/lib/redux/services/authApi";
import { authReducer } from "@src/lib/redux/slices";

export const reducer = {
  auth: authReducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};
