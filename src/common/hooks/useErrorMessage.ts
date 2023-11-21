import { useEffect, useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (error && "data" in error) {
      if (
        typeof error.data === "object" &&
        error.data &&
        "message" in error.data
      ) {
        setErrorMessage(JSON.stringify(error.data.message));
      }
    }
  }, [error]);

  const resetErrorMessage = () => {
    setErrorMessage("");
  };

  return {
    errorMessage,
    resetErrorMessage,
  };
};
