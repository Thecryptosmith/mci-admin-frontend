import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";

type CreateCompanyWalletsProps = {
  walletsCount: number;
  setWalletsCount: Dispatch<SetStateAction<number>>;
};

export default function CreateCompanyWallets({
  walletsCount,
  setWalletsCount,
}: CreateCompanyWalletsProps) {
  const { data: networksData } = useGetAllNetworksQuery();

  return (
    <>
      <Grid item xs={12}>
        <Typography>Company wallets:</Typography>
      </Grid>

      {[...Array(walletsCount).keys()].map((value, i, array) => (
        <Grid key={value} container spacing={2}>
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

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id={`walletName${value}`}
              label="Wallet Name"
              name={`walletName${value}`}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id={`memo${value}`}
              label="Memo"
              name={`memo${value}`}
            />
          </Grid>

          {array.length - 1 !== i && (
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button
          sx={{ mr: 2 }}
          color="secondary"
          variant={"contained"}
          onClick={() => setWalletsCount((prevState) => prevState + 1)}
        >
          Add more wallets
        </Button>

        {walletsCount > 1 && (
          <Button
            color="error"
            variant={"contained"}
            onClick={() =>
              setWalletsCount((prevState) =>
                prevState !== 1 ? prevState - 1 : 1,
              )
            }
          >
            Remove last wallet
          </Button>
        )}
      </Grid>
    </>
  );
}
