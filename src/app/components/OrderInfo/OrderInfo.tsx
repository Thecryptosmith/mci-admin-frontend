import { ReactNode } from "react";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Paper from "@mui/material/Paper/Paper";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import Typography from "@mui/material/Typography/Typography";

type OrderInfoProps = {
  orderStatus?: string;
  handleOrderStatusChange: (e: SelectChangeEvent<string>) => void;
  statusValues: string[];
  handleChangeStatusSubmit: () => void;
  data: {
    orderCode: string;
    orderStatus: string;
    orderType: string;
  };
  children: ReactNode;
};

export default function OrderInfo({
  orderStatus,
  handleOrderStatusChange,
  statusValues,
  handleChangeStatusSubmit,
  data,
  children,
}: OrderInfoProps) {
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
          <b>Order Type: </b>
          {data.orderType}
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1, mb: 1 }}
        >
          <FormControl sx={{ width: 400 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={orderStatus ?? ""}
              label="Status"
              onChange={handleOrderStatusChange}
            >
              {statusValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={handleChangeStatusSubmit}>
            Change status
          </Button>
        </Box>
      </Box>

      {children}
    </Paper>
  );
}
