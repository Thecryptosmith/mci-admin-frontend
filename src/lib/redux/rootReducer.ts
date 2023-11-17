import { adminApi } from "@src/lib/redux/services/adminApi";
import { authReducer } from "@src/lib/redux/slices";

export const reducer = {
  auth: authReducer,
  [adminApi.reducerPath]: adminApi.reducer,
};
