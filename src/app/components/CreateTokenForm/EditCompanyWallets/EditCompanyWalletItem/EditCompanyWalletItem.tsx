import * as React from "react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import { CompanyWalletForEditType } from "@src/types/getFullTokenInfoRes";
import { GetNetworksListRes } from "@src/types/getNetworksListRes";

type EditCompanyWalletItemProps = {
  wallet: CompanyWalletForEditType;
  index: number;
  setCompanyWallets: Dispatch<SetStateAction<CompanyWalletForEditType[]>>;
  networksData: GetNetworksListRes | undefined;
  isLastIndex: boolean;
};

export default function EditCompanyWalletItem({
  wallet,
  index,
  setCompanyWallets,
  networksData,
  isLastIndex,
}: EditCompanyWalletItemProps) {
  const [isMemoNeeded, setIsMemoNeeded] = useState<string>(
    wallet?.tokenExplorer?.isMemoNeeded ? "1" : "2",
  );

  const handleChangeInput = (
    {
      target: { name, value },
    }:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>,
    index: number,
  ) => {
    if (name === "isMemoNeeded") {
      setIsMemoNeeded(value as string);
    }

    setCompanyWallets((prevState) => {
      const newArr = [...prevState];

      if (name === "walletExplorerLink" || name === "transactionExplorerLink") {
        newArr[index] = {
          ...newArr[index],
          tokenExplorer: {
            ...newArr[index].tokenExplorer,
            [name]: value as string,
          },
        };

        return newArr;
      }

      if (name === "isMemoNeeded") {
        newArr[index] = {
          ...newArr[index],
          tokenExplorer: {
            ...newArr[index].tokenExplorer,
            [name]: value === "1",
          },
        };

        return newArr;
      }

      newArr[index] = { ...newArr[index], [name]: value };

      return newArr;
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          sx={{ mt: 2 }}
          fullWidth
          id={`walletAddress${index}`}
          label="Wallet Address"
          name="walletAddress"
          value={wallet.walletAddress}
          onChange={(e) => handleChangeInput(e, index)}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id={`walletExplorerLink${index}`}
          label="Wallet Explorer Link"
          name="walletExplorerLink"
          value={wallet.tokenExplorer?.walletExplorerLink ?? ""}
          onChange={(e) => handleChangeInput(e, index)}
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id={`transactionExplorerLink${index}`}
          label="Transaction Explorer Link"
          name="transactionExplorerLink"
          value={wallet.tokenExplorer?.transactionExplorerLink ?? ""}
          onChange={(e) => handleChangeInput(e, index)}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required>
          <InputLabel id="network-select-label">Network</InputLabel>
          <Select
            defaultValue={wallet.networkId}
            labelId="network"
            id={`network${index}`}
            name="networkId"
            label="Network"
            MenuProps={{
              style: {
                maxHeight: 400,
              },
            }}
            value={wallet.networkId ?? ""}
            onChange={(e) => handleChangeInput(e, index)}
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

      <Grid item xs={12} sm={8}>
        <TextField
          required
          fullWidth
          id={`walletName${index}`}
          label="Wallet Name"
          name="name"
          value={wallet.name}
          onChange={(e) => handleChangeInput(e, index)}
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
          <FormLabel id={`isMemoNeeded${index}`}>Is memo needed?</FormLabel>
          <RadioGroup
            value={isMemoNeeded}
            sx={{ display: "flex", flexDirection: "row" }}
            name="isMemoNeeded"
            onChange={(e) => handleChangeInput(e, index)}
          >
            <FormControlLabel value={"1"} control={<Radio />} label="Yes" />
            <FormControlLabel value={"2"} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <TextField
          required={isMemoNeeded === "1"}
          disabled={isMemoNeeded === "2"}
          fullWidth
          id={`memo${index}`}
          label="Memo"
          name="memo"
          value={wallet.memo ?? ""}
          onChange={(e) => handleChangeInput(e, index)}
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
