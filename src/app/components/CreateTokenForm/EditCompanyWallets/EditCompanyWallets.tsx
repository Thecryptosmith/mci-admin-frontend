import * as React from "react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";
import { CompanyWalletForEditType } from "@src/types/getFullTokenInfoRes";

type EditCompanyWalletsProps = {
  companyWallets: CompanyWalletForEditType[];
  setCompanyWallets: Dispatch<SetStateAction<CompanyWalletForEditType[]>>;
};

export default function EditCompanyWallets({
  companyWallets,
  setCompanyWallets,
}: EditCompanyWalletsProps) {
  const { data: networksData } = useGetAllNetworksQuery();

  console.log(companyWallets);

  const handleChangeInput = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>,
    index: number,
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setCompanyWallets((prevState) => {
      const newArr = [...prevState];

      newArr[index] = { ...newArr[index], [e.target.name]: e.target.value };

      return newArr;
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography>Company wallets:</Typography>
      </Grid>

      {companyWallets.map((wallet, i) => (
        <Grid key={wallet.id} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              sx={{ mt: 2 }}
              fullWidth
              id={`walletAddress${i}`}
              label="Wallet Address"
              name="walletAddress"
              value={wallet.walletAddress}
              onChange={(e) => handleChangeInput(e, i)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="network-select-label">Network</InputLabel>
              <Select
                defaultValue={wallet.networkId}
                labelId="network"
                id={`network${i}`}
                name="networkId"
                label="Network"
                MenuProps={{
                  style: {
                    maxHeight: 400,
                  },
                }}
                value={wallet.networkId ?? ""}
                onChange={(e) => handleChangeInput(e, i)}
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
              id={`walletName${i}`}
              label="Wallet Name"
              name="name"
              value={wallet.name}
              onChange={(e) => handleChangeInput(e, i)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id={`memo${i}`}
              label="Memo"
              name="memo"
              value={wallet.memo ?? ""}
              onChange={(e) => handleChangeInput(e, i)}
            />
          </Grid>

          {companyWallets.length - 1 !== i && (
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
          onClick={() =>
            setCompanyWallets((prevState) => [
              ...prevState,
              {
                id: Date.now(),
                walletAddress: "",
                name: "",
                memo: "",
                networkId: "",
              },
            ])
          }
        >
          Add more wallets
        </Button>

        {companyWallets.length > 1 && (
          <Button
            color="error"
            variant={"contained"}
            onClick={() =>
              setCompanyWallets((prevState) => {
                const newArr = [...prevState];

                newArr.pop();

                return newArr;
              })
            }
          >
            Remove last wallet
          </Button>
        )}
      </Grid>
    </>
  );
}
