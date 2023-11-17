import { baseApiUrl } from "@src/common/consts/baseApiUrl";
import { SignInReqPayload } from "@src/types/signInReqPayload";
import { SignInRes } from "@src/types/signInRes";

export const signInAdmin = async (
  body: SignInReqPayload,
): Promise<SignInRes> => {
  const response = await fetch(`${baseApiUrl}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
};
