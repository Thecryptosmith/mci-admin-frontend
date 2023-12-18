"use client";

import * as React from "react";
import { FormEvent, useState } from "react";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid/Grid";
import Input from "@mui/material/Input/Input";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SelectNetworksWithTokens from "@src/app/components/CreateWalletProviderForm/SelectNetworksWithTokens/SelectNetworksWithTokens";
import { NetworkWithTokens } from "@src/types/wallet-providers/network-with-tokens";

export default function CreateWalletProviderForm() {
  const isLoading = false;

  const [networksWithTokens, setNetworksWithTokens] = useState<
    NetworkWithTokens[]
  >(() => [
    {
      id: Date.now().toString(),
      data: {
        id: 0,
        tokensInfo: null,
      },
    },
  ]);

  console.log(networksWithTokens);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const payload = {
      name: data.get("name"),
      description: data.get("description"),
      url: data.get("url"),
      about: data.get("about"),
      overallRanking: data.get("overallRanking")
        ? Number(data.get("overallRanking"))
        : 0,
      rating: data.get("rating") ? Number(data.get("overallRanking")) : 0,
      category: data.get("category"),
      file: data.get("file"),
    };

    console.log(payload);
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
            <TextField
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
            />
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
