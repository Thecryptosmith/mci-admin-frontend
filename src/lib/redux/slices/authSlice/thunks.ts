/* Instruments */
import { createAppAsyncThunk } from "@src/lib/redux/createAppAsyncThunk";
import { signInAdmin } from "@src/lib/redux/slices/authSlice/signInAdmin";
import { SignInReqPayload } from "@src/types/signInReqPayload";

export const signIn = createAppAsyncThunk(
  "user/signInAdmin",
  async (body: SignInReqPayload) => {
    return signInAdmin(body);
  },
);
