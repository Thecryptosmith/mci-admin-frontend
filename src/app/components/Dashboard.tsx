"use client";

import * as React from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Alert severity="info" sx={{ mt: 2, mb: 5, width: "100%" }}>
        <AlertTitle>Hello 👋</AlertTitle>
        Welcome to MCI Admin panel
      </Alert>
    </Box>
  );
}
