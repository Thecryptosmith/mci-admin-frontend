import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UserWalletStatusEnum } from "@src/common/emuns/UserWalletStatusEnum";
import { GetUserWalletsQueryParams } from "@src/types/getUserWalletsQueryParams";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statuses = Object.values(UserWalletStatusEnum);

type WalletStatusFilterProps = {
  setPayload: Dispatch<SetStateAction<GetUserWalletsQueryParams>>;
};

export default function WalletStatusFilter({
  setPayload,
}: WalletStatusFilterProps) {
  const [walletStatus, setWalletStatus] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof walletStatus>) => {
    const {
      target: { value },
    } = event;
    setWalletStatus(
      // On autofill, we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleFilter = () => {
    setPayload((prevState) => ({
      ...prevState,
      status: walletStatus as UserWalletStatusEnum[],
    }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, ml: 2 }}>
      <FormControl sx={{ width: 350 }}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          multiple
          value={walletStatus}
          onChange={handleChange}
          input={<OutlinedInput id="status-filter-chip" label="Status" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleFilter}>
        Filter
      </Button>
    </Box>
  );
}
