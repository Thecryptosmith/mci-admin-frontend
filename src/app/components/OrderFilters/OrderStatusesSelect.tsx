import * as React from "react";

import Box from "@mui/material/Box/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

type OrderStatusesSelectProps = {
  orderStatuses: string[];
  setOrderStatuses: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function OrderStatusesSelect({
  orderStatuses,
  setOrderStatuses,
}: OrderStatusesSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof orderStatuses>) => {
    const {
      target: { value },
    } = event;
    setOrderStatuses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="order-statuses-label">Status</InputLabel>
        <Select
          labelId="order-statuses-label"
          id="order-statuses"
          multiple
          value={orderStatuses}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.values(OrderStatusEnum).map((status) => (
            <MenuItem key={status} value={status}>
              <Checkbox checked={orderStatuses.indexOf(status) > -1} />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
