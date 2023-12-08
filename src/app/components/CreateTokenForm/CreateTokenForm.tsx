"use client";

import * as React from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  useGetAllNetworksQuery,
  useGetDefaultTokenQuery,
  useSearchPairQuery,
  useSearchTokenBySlugQuery,
} from "@src/lib/redux/services/adminApi";

export default function CreateTokenForm() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [searchSlug, setSearchSlug] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [coinMarketId, setCoinMarketId] = useState<number | string>("");
  const [stakedCoins, setStakedCoins] = useState<string>("");
  const [krakenAssetName, setKrakenAssetName] = useState<string>("");
  const [rank, setRank] = useState<string | number>("");
  const [minOrderValue, setMinOrderValue] = useState<number>(0);
  const [pairName, setPairName] = useState<string>("");
  const [searchPairName, setSearchPairName] = useState<string>("");
  const [isPairMatch, setIsPairMatch] = useState<boolean>(true);
  const [defaultTokenPosition, setDefaultTokenPosition] = useState<
    number | null
  >(null);
  const [walletsCount, setWalletsCount] = useState<number>(1);

  const form = useRef<HTMLFormElement>(null);

  const { data, isSuccess, isError } = useSearchTokenBySlugQuery(searchValue, {
    skip: !searchValue,
  });

  const {
    data: pairData,
    isSuccess: isPairSuccess,
    isError: isPairError,
  } = useSearchPairQuery(searchPairName, {
    skip: !searchPairName,
  });

  const { data: defaultTokenData } = useGetDefaultTokenQuery();

  const { data: networksData } = useGetAllNetworksQuery();

  useEffect(() => {
    if (data && form.current) {
      // form.current.set("rank", 1);
      setCoinMarketId(data.id);
      setKrakenAssetName(data.symbol);
    }
  }, [data]);

  useEffect(() => {
    if (pairData) {
      setIsPairMatch(pairData?.[searchPairName]?.altname === searchPairName);
    }
  }, [pairData, searchPairName]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const companyWallets = [...Array(walletsCount).keys()].map((value) => {
      return {
        name: data.get(`walletName${value}`),
        networkId: data.get(`network${value}`),
        walletAddress: data.get(`walletAddress${value}`),
        memo: data.get(`memo${value}`) ? data.get(`memo${value}`) : null,
      };
    });

    console.log({
      tokenInfo: {
        coinMarketId: coinMarketId,
        slug: searchValue,
        name: data.get("name"),
        symbol: data.get("symbol"),
        logo: data.get("logo"),
        description: data.get("description"),
        dateAdded: data.get("dateAdded"),
        dateLaunched: data.get("dateLaunched"),
        category: data.get("category"),
        stakedCoins: stakedCoins ? stakedCoins : null,
        krakenAssetName,
        rank: rank ? rank : null,
      },
      tokenPair: {
        defaultTokenId: defaultTokenData ? defaultTokenData.defaultToken.id : 0,
        pairName: isPairMatch ? searchPairName : null,
        defaultTokenPosition,
      },
      companyWallets,
    });
  };

  const handleSearchTokenBySlug = () => {
    if (searchSlug) {
      setSearchValue(searchSlug);
    }
  };

  const handleSearchPair = () => {
    if (pairName) {
      setSearchPairName(pairName);
    }
  };

  const onRadioChange = (value: string) => {
    setDefaultTokenPosition(Number(value));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "calc(100% - 220px)",
          paddingBottom: "70px",
        }}
      >
        <Typography component="h1" variant="h5">
          Create new token form
        </Typography>
        <Box
          component="form"
          ref={form}
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={11}>
              <TextField
                error={isError}
                helperText={isError ? "Token not found" : null}
                required
                fullWidth
                id="search-by-slug"
                label="Search by slug"
                name="search-by-slug"
                type="search"
                value={searchSlug}
                onChange={(e) => setSearchSlug(e.target.value.toLowerCase())}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearchTokenBySlug}
                sx={{ height: "56px" }}
              >
                Search
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={data?.name ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="symbol"
                label="Symbol"
                name="symbol"
                value={data?.symbol ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                name="coinMarketId"
                required
                fullWidth
                id="coinMarketId"
                label="Coin Market ID"
                value={coinMarketId}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="slug"
                label="Slug"
                name="slug"
                value={searchValue}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="logo"
                label="Logo"
                name="logo"
                value={data?.logo ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="dateAdded"
                label="Date Added"
                name="dateAdded"
                value={data?.date_added ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="dateLaunched"
                label="Date Launched"
                name="dateLaunched"
                value={data?.date_launched ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="category"
                label="Category"
                name="category"
                value={data?.category ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="minOrderValue"
                label="Min Order Value"
                name="minOrderValue"
                value={minOrderValue}
                type="number"
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                id="krakenAssetName"
                label="Kraken Asset Name"
                name="krakenAssetName"
                value={krakenAssetName}
                onChange={(e) => setKrakenAssetName(e.target.value)}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="rank"
                label="Rank"
                name="rank"
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="stakedCoins"
                label="Staked Coins"
                name="stakedCoins"
                value={stakedCoins}
                type="number"
                onChange={(e) => setStakedCoins(e.target.value)}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={data?.description ?? ""}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={11}>
              <TextField
                error={isPairError || !isPairMatch}
                helperText={
                  isPairError || !isPairMatch ? "Pair does not exist" : ""
                }
                required
                fullWidth
                id="pairName"
                label="Pair Name"
                name="pairName"
                type="search"
                value={pairName}
                onChange={(e) => setPairName(e.target.value)}
              />

              {pairData && !isPairError && (
                <>
                  <span>
                    wsname: {pairData?.[Object.keys(pairData)[0]]?.wsname}
                  </span>{" "}
                  <span>
                    altname: {pairData?.[Object.keys(pairData)[0]]?.altname}
                  </span>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearchPair}
                sx={{ height: "56px" }}
              >
                Search pair
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormLabel id="default-token-position">
                Default token position:
              </FormLabel>
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row" }}
                name="default-token-position"
                onChange={(event, value) => onRadioChange(value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="First" />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Second"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
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
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="network-select-label">Network</InputLabel>
                  <Select
                    required
                    defaultValue={""}
                    labelId="network"
                    id={`network${value}`}
                    name={`network${value}`}
                    label="Network"
                  >
                    {networksData &&
                      networksData.networks.map((network) => (
                        <MenuItem key={network.id} value={network.id}>
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

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Divider />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Drawer
        sx={{
          width: 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            top: ["48px", "56px", "64px"],
            height: "auto",
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <Typography variant="overline" sx={{ fontWeight: 500 }}>
              Actions
            </Typography>
          </ListItem>

          <ListItem>
            <Link href={"/tokens/create"} target="_blank">
              <Button variant={"contained"}>Add new network</Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
