import { ReactNode } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";

type OrderInfoProps = {
  data: {
    orderCode: string;
    orderStatus: string;
    orderType: string;
  };
  children: ReactNode;
};

export default function OrderInfo({ data, children }: OrderInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <Box>
        <Typography variant="h5">Order info:</Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1">
          <b>Order Code: </b>
          {data.orderCode}
        </Typography>
        <Typography variant="body1">
          <b>Order Status: </b>
          {data.orderStatus}
        </Typography>
        <Typography variant="body1">
          <b>Order Type: </b>
          {data.orderType}
        </Typography>
      </Box>

      {children}
    </Paper>
  );
}
