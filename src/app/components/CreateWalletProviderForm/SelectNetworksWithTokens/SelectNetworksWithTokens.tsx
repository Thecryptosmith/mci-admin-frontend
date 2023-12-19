import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl/FormControl";
import Grid from "@mui/material/Grid/Grid";
import IconButton from "@mui/material/IconButton/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import AssetsSelect from "@src/app/components/OrderFilters/AssetsSelect";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";
import { TokenData } from "@src/types/getTokensRes";
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
  const [selectedAssets, setSelectedAssets] = useState<TokenData[]>([]);
  const [yieldValue, setYieldValue] = useState<number | string>("");

  const { data: networksData } = useGetAllNetworksQuery();

  useEffect(() => {
    if (selectedAssets.length > 0) {
      setNetworksWithTokens((prevState) => {
        const newArr = [...prevState];

        const itemIndex = newArr.findIndex((item) => item.id === network.id);

        newArr[itemIndex].data.tokensInfo = selectedAssets.map((asset) => ({
          id: asset.id,
          yield: null,
        }));

        newArr[itemIndex].data.yield = yieldValue ? Number(yieldValue) : null;

        return newArr;
      });
    }
  }, [network.id, selectedAssets, setNetworksWithTokens, yieldValue]);

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

  const handleDelete = () => {
    setNetworksWithTokens((prevState) =>
      prevState.filter((item) => item.id !== network.id),
    );
  };

  return (
    <>
      <Grid item xs={12} sm={1}>
        <TextField
          fullWidth
          type="number"
          id="yield"
          label="Yield"
          name="yield"
          value={yieldValue}
          onChange={(e) => setYieldValue(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={2}>
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

      <Grid item xs={12} sm={8}>
        {selectedNetwork && (
          <AssetsSelect
            label={"Select Assets"}
            selectedValues={selectedAssets}
            setSelectedValues={setSelectedAssets}
            networkId={Number(selectedNetwork)}
            isNetworkTokens
          />
        )}
      </Grid>

      <Grid
        item
        xs={12}
        sm={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
    </>
  );
}
