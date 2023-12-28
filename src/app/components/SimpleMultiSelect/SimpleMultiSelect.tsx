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

type SimpleMultiSelectProps = {
  label: string;
  itemsList: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SimpleMultiSelect({
  label,
  itemsList,
  selectedItems,
  setSelectedItems,
}: SimpleMultiSelectProps) {
  const handleChange = ({
    target: { value },
  }: SelectChangeEvent<typeof selectedItems>) => {
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="simple-miltiselect-label">{label}</InputLabel>
        <Select
          labelId="simple-miltiselect-label"
          id="simple-miltiselect"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onDelete={() => {
                    setSelectedItems((prevState) =>
                      prevState.filter((item) => item !== value),
                    );
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {itemsList.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedItems.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
