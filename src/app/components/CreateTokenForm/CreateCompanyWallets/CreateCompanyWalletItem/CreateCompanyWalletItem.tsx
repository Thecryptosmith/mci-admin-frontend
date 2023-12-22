import * as React from "react";
import { useState } from "react";
import Image from "next/image";

import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import { GetNetworksListRes } from "@src/types/getNetworksListRes";

type CompanyWalletItemProps = {
  value: number;
  networksData: GetNetworksListRes | undefined;
  isLastIndex: boolean;
};

export default function CreateCompanyWalletItem({
  value,
  networksData,
  isLastIndex,
}: CompanyWalletItemProps) {
  const [isMemoNeeded, setIsMemoNeeded] = useState<string>("2");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          sx={{ mt: 2 }}
          fullWidth
          id={`walletAddress${value}`}
          label="Wallet Address"
          name={`walletAddress${value}`}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id={`walletExplorerLink${value}`}
          label="Wallet Explorer Link"
          name={`walletExplorerLink${value}`}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id={`transactionExplorerLink${value}`}
          label="Transaction Explorer Link"
          name={`transactionExplorerLink${value}`}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required>
          <InputLabel id="network-select-label">Network</InputLabel>
          <Select
            defaultValue={""}
            labelId="network"
            id={`network${value}`}
            name={`network${value}`}
            label="Network"
            MenuProps={{
              style: {
                maxHeight: 400,
              },
            }}
          >
            {networksData &&
              networksData.networks.map((network) => (
                <MenuItem
                  key={network.id}
                  value={network.id}
                  sx={{ display: "flex", gap: 1 }}
                >
                  <Image
                    title={network.name}
                    src={network.logo}
                    width={16}
                    height={16}
                    alt="token logo"
                  />{" "}
                  {network.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          required
          fullWidth
          id={`walletName${value}`}
          label="Wallet Name"
          name={`walletName${value}`}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl
          required
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <FormLabel id={`isMemoNeeded${value}`}>Is memo needed?</FormLabel>
          <RadioGroup
            value={isMemoNeeded}
            sx={{ display: "flex", flexDirection: "row" }}
            name={`isMemoNeeded${value}`}
            onChange={(event, value) => setIsMemoNeeded(value)}
          >
            <FormControlLabel value={"1"} control={<Radio />} label="Yes" />
            <FormControlLabel value={"2"} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <TextField
          required={isMemoNeeded === "1"}
          disabled={isMemoNeeded === "2"}
          fullWidth
          id={`memo${value}`}
          label="Memo"
          name={`memo${value}`}
        />
      </Grid>

      {isLastIndex && (
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Divider />
        </Grid>
      )}
    </Grid>
  );
}
