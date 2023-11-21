"use client";

/* Core */
import { Provider } from "react-redux";

import { VerificationProvider } from "@src/lib/providers/VerificationProvider/VerificationProvider";
/* Instruments */
import { reduxStore } from "@src/lib/redux";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <VerificationProvider>{props.children}</VerificationProvider>
    </Provider>
  );
};
