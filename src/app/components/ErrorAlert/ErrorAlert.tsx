"use client";

import * as React from "react";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert/Alert";
import IconButton from "@mui/material/IconButton/IconButton";
import Snackbar from "@mui/material/Snackbar/Snackbar";

type ErrorAlertProps = {
  isOpen: boolean;
  errorMessage: string;
};

export default function ErrorAlert({
  isOpen = false,
  errorMessage,
}: ErrorAlertProps) {
  const [open, setOpen] = useState<boolean>(isOpen);

  const handleErrorClose = () => {
    setOpen(false);
  };

  const errorAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleErrorClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      style={{ top: "80px" }}
      onClose={handleErrorClose}
    >
      <Alert severity="error" action={errorAction}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
