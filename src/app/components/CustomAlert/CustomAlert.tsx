"use client";

import * as React from "react";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert, { AlertColor } from "@mui/material/Alert/Alert";
import IconButton from "@mui/material/IconButton/IconButton";
import Snackbar from "@mui/material/Snackbar/Snackbar";

type CustomAlertProps = {
  severity: AlertColor;
  isOpen: boolean;
  message: string;
};

export default function CustomAlert({
  severity = "info",
  isOpen = false,
  message,
}: CustomAlertProps) {
  const [open, setOpen] = useState<boolean>(isOpen);

  const handleAlertClose = () => {
    setOpen(false);
  };

  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleAlertClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      style={{ top: "80px" }}
      onClose={handleAlertClose}
    >
      <Alert severity={severity} action={alertAction}>
        {message}
      </Alert>
    </Snackbar>
  );
}
