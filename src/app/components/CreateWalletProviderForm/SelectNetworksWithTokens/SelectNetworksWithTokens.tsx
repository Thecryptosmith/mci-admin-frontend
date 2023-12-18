import { Dispatch, SetStateAction, useState } from "react";
import * as React from "react";
import Image from "next/image";

import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import Grid from "@mui/material/Grid/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";
import { NetworkWithTokens } from "@src/types/wallet-providers/network-with-tokens";

type SelectNetworksWithTokensProps = {
  network: NetworkWithTokens;
  index: number;
  setNetworksWithTokens: Dispatch<SetStateAction<NetworkWithTokens[]>>;
};

export default function SelectNetworksWithTokens({
  network,
  index,
  setNetworksWithTokens,
}: SelectNetworksWithTokensProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<number | string>("");

  const { data: networksData } = useGetAllNetworksQuery();

  const onNetworkSelect = (e: SelectChangeEvent<string | number>) => {
    setSelectedNetwork(e.target.value);

    setNetworksWithTokens((prevState) => {
      const newArr = [...prevState];

      const itemIndex = newArr.findIndex((item) => item.id === network.id);

      newArr[itemIndex].data.id = Number(e.target.value);
      newArr[itemIndex].data.tokensInfo = null;

      return newArr;
    });
  };

  return (
    <>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth required>
          <InputLabel id="network-select-label">Network</InputLabel>
          <Select
            defaultValue={""}
            labelId="network"
            id={`network${index}`}
            name={`network${index}`}
            label="Network"
            value={selectedNetwork}
            onChange={onNetworkSelect}
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

      <Grid item xs={12} sm={4}></Grid>

      <Grid item xs={12} sm={4}>
        <Button>Delete</Button>
      </Grid>
    </>
  );
}
