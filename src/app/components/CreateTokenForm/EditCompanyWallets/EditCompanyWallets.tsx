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

  const handleChangeInput = (
    {target: {name, value}}:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>,
    index: number,
  ) => {
    setCompanyWallets((prevState) => {
      const newArr = [...prevState];

      if(name === 'walletExplorerLink' || name === 'transactionExplorerLink') {
        newArr[index] = { ...newArr[index], tokenExplorer: {...newArr[index].tokenExplorer, [name]: value as string}};

        return newArr
      }

      newArr[index] = { ...newArr[index], [name]: value };

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
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id={`walletExplorerLink${i}`}
              label="Wallet Explorer Link"
              name="walletExplorerLink"
              value={wallet.tokenExplorer?.walletExplorerLink ?? ""}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id={`transactionExplorerLink${i}`}
              label="Transaction Explorer Link"
              name="transactionExplorerLink"
              value={wallet.tokenExplorer?.transactionExplorerLink ?? ""}
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
                disabled={typeof wallet.id === "number"}
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
                id: Date.now().toString(),
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

        {companyWallets.length > 0 && (
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
