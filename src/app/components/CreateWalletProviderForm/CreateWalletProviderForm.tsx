"use client";

import * as React from "react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import Grid from "@mui/material/Grid/Grid";
import Input from "@mui/material/Input/Input";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SelectNetworksWithTokens from "@src/app/components/CreateWalletProviderForm/SelectNetworksWithTokens/SelectNetworksWithTokens";
import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import { useCreateWalletProviderMutation } from "@src/lib/redux/services/adminApi";
import {
  NetworkTokensInfo,
  NetworkWithTokens,
  NetworkWithTokensPayload,
} from "@src/types/wallet-providers/network-with-tokens";

const initialNetworkWithTokens = {
  id: Date.now().toString(),
  data: {
    id: 0,
    tokensInfo: null,
    yield: null,
  },
};

export default function CreateWalletProviderForm() {
  const [category, setCategory] = useState<WalletProviderCategoryEnum | "">("");
  const [networksWithTokens, setNetworksWithTokens] = useState<
    NetworkWithTokens[]
  >([initialNetworkWithTokens]);

  const [createWalletProvider, { isLoading }] =
    useCreateWalletProviderMutation();

  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeCategory = (
    e: SelectChangeEvent<WalletProviderCategoryEnum>,
  ) => {
    setCategory(e.target.value as WalletProviderCategoryEnum);
  };

  const mapTokensInfo = (
    tokens: NetworkTokensInfo[],
    yieldValue: number | null,
  ) => {
    return tokens.map((token) => ({ id: token.id, yield: yieldValue }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newNetworksWithTokens = networksWithTokens.reduce((acc, item) => {
      const yieldValue = item.data.yield ? Number(item.data.yield) : null;

      const existingNetworkIndex = acc.findIndex(
        (value) => value.id === item.data.id,
      );

      if (existingNetworkIndex >= 0) {
        const ids = acc[existingNetworkIndex].tokensInfo.map(
          (value) => value.id,
        );

        const newArr = mapTokensInfo(item.data.tokensInfo!, yieldValue);

        acc[existingNetworkIndex].tokensInfo = newArr.reduce(
          (acc, oldValue) => {
            if (ids.includes(oldValue.id)) {
              return acc;
            }

            acc.push(oldValue);

            return acc;
          },
          [...acc[existingNetworkIndex].tokensInfo] as NetworkTokensInfo[],
        );

        return acc;
      }

      const data = {
        id: item.data.id,
        tokensInfo: mapTokensInfo(item.data.tokensInfo!, yieldValue),
      };

      acc.push(data);

      return acc;
    }, [] as NetworkWithTokensPayload[]);

    data.append("category", category);
    data.append("networks", JSON.stringify(newNetworksWithTokens));

    createWalletProvider(data)
      .unwrap()
      .then(() => {
        toast.success("Wallet provider successfully created");
        setNetworksWithTokens([
          { ...initialNetworkWithTokens, id: Date.now().toString() },
        ]);
        setCategory("");
        formRef.current && formRef.current.reset();
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  const handleAddMore = () => {
    setNetworksWithTokens((prevState) => [
      ...prevState,
      {
        id: Date.now().toString(),
        data: {
          id: 0,
          tokensInfo: null,
        },
      },
    ]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingBottom: "70px",
      }}
    >
      <Typography component="h1" variant="h5">
        Create wallet provider
      </Typography>

      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "100%" }}
        ref={formRef}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField required fullWidth id="name" label="Name" name="name" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField required fullWidth id="url" label="Url" name="url" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                label="Category"
                value={category}
                onChange={handleChangeCategory}
              >
                {Object.values(WalletProviderCategoryEnum).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="overallRanking"
              label="Overall Ranking"
              name="overallRanking"
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="rating"
              label="Rating"
              name="rating"
              type="number"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="about"
              label="About"
              name="about"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>
              Attach wallet provider logo * (exact size: 64x64 pixels; allowed
              types: jpg, jpeg, png)
            </Typography>
            <Input required type={"file"} name="file" id="file" />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {networksWithTokens.map((network, index) => (
            <SelectNetworksWithTokens
              key={network.id}
              network={network}
              index={index}
              setNetworksWithTokens={setNetworksWithTokens}
            />
          ))}

          <Grid item xs={12} sm={4}>
            <Button onClick={handleAddMore}>Add more</Button>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "56px" }}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}
