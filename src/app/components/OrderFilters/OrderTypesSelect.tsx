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
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";

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

type OrderTypesSelectProps = {
  orderTypes: string[];
  setOrderTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function OrderTypesSelect({
  orderTypes,
  setOrderTypes,
}: OrderTypesSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof orderTypes>) => {
    const {
      target: { value },
    } = event;
    setOrderTypes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="order-types-label">Type</InputLabel>
        <Select
          labelId="order-types-label"
          id="order-types"
          multiple
          value={orderTypes}
          onChange={handleChange}
          input={<OutlinedInput label="Type" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.values(OrderTypeEnum).map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={orderTypes.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
