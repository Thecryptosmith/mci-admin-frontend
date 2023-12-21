"use client";

/* Core */
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { VerificationProvider } from "@src/lib/providers/VerificationProvider/VerificationProvider";
/* Instruments */
import { reduxStore } from "@src/lib/redux";

import "react-toastify/dist/ReactToastify.css";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <VerificationProvider>{props.children}</VerificationProvider>
      <ToastContainer autoClose={5000} position="top-center" />
    </Provider>
  );
};
