"use client";

import * as React from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddNetwork from "@src/app/components/AddNetwork/AddNetwork";
import NetworksList from "@src/app/components/NetworksList/NetworksList";
import { TokenPairPositionEnum } from "@src/common/emuns/TokenPairPositionEnum";
import {
  useCreateTokenMutation,
  useGetAllNetworksQuery,
  useGetDefaultTokenQuery,
  useSearchPairQuery,
  useSearchTokenBySlugQuery,
} from "@src/lib/redux/services/adminApi";

type TokenInfoType = {
  coinMarketId: number | string;
  name: string;
  symbol: string;
  logo: string;
  dateAdded: string | null;
  dateLaunched: string | null;
  category: string | null;
  description: string | null;
  krakenAssetName: string;
  stakedCoins: string | null;
};

const initialTokenInfo: TokenInfoType = {
  coinMarketId: "",
  name: "",
  symbol: "",
  logo: "",
  dateAdded: "",
  dateLaunched: "",
  category: "",
  description: "",
  krakenAssetName: "",
  stakedCoins: "",
};

export default function CreateTokenForm() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [searchSlug, setSearchSlug] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfoType>(initialTokenInfo);
  const [rank, setRank] = useState<string | number>("");
  const [minOrderValue, setMinOrderValue] = useState<string | number>("");
  const [pairName, setPairName] = useState<string>("");
  const [searchPairName, setSearchPairName] = useState<string>("");
  const [isPairMatch, setIsPairMatch] = useState<boolean>(true);
  const [defaultTokenPosition, setDefaultTokenPosition] =
    useState<TokenPairPositionEnum | null>(null);
  const [walletsCount, setWalletsCount] = useState<number>(1);
  const [showPairMsg, setShowPairMsg] = useState<boolean>(false);

  const { data, isSuccess, isError, isFetching } = useSearchTokenBySlugQuery(
    searchValue,
    {
      skip: !searchValue,
    },
  );

  const {
    data: pairData,
    isError: isPairError,
    isFetching: isPairFetching,
  } = useSearchPairQuery(searchPairName, {
    skip: !searchPairName,
  });

  const { data: defaultTokenData } = useGetDefaultTokenQuery();

  const { data: networksData } = useGetAllNetworksQuery();

  const [createToken, { isLoading: isCreateTokenLoading }] =
    useCreateTokenMutation();

  useEffect(() => {
    if (data) {
      setTokenInfo((prevState) => ({
        ...prevState,
        coinMarketId: data.id,
        name: data.name ?? "",
        symbol: data.symbol ?? "",
        logo: data.logo ?? "",
        dateAdded: data.date_added ?? "",
        dateLaunched: data.date_launched ?? "",
        category: data.category ?? "",
        description: data.description ?? "",
        krakenAssetName: data.symbol ?? "",
      }));
    }
  }, [data]);

  useEffect(() => {
    if (pairData) {
      setIsPairMatch(pairData?.[searchPairName]?.altname === searchPairName);
      setShowPairMsg(true);
    } else {
      setShowPairMsg(false);
    }
  }, [pairData, searchPairName]);

  useEffect(() => {
    if (isPairMatch && !isPairError) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isPairError, isPairMatch, isFetching]);

  useEffect(() => {
    if (walletsCount === 0) {
      setWalletsCount(1);
    }
  }, [walletsCount]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const companyWallets = [...Array(walletsCount).keys()].map((value) => {
      return {
        name: data.get(`walletName${value}`)! as string,
        networkId: Number(data.get(`network${value}`)!),
        walletAddress: data.get(`walletAddress${value}`)! as string,
        memo: data.get(`memo${value}`)
          ? (data.get(`memo${value}`) as string)
          : null,
      };
    });

    const payload = {
      tokenInfo: {
        coinMarketId: Number(tokenInfo.coinMarketId),
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        logo: tokenInfo.logo,
        krakenAssetName: tokenInfo.krakenAssetName,
        minOrderValue: Number(minOrderValue),
        slug: searchValue,
        stakedCoins: tokenInfo.stakedCoins ? tokenInfo.stakedCoins : null,
        dateAdded: tokenInfo.dateAdded ? tokenInfo.dateAdded : null,
        dateLaunched: tokenInfo.dateLaunched ? tokenInfo.dateLaunched : null,
        category: tokenInfo.category ? tokenInfo.category : null,
        description: tokenInfo.description ? tokenInfo.description : null,
        rank: rank ? Number(rank) : null,
      },
      tokenPair: {
        defaultTokenId: defaultTokenData ? defaultTokenData.defaultToken.id : 0,
        pairName: isPairMatch ? searchPairName : "",
        defaultTokenPosition: defaultTokenPosition as TokenPairPositionEnum,
      },
      companyWallets,
    };

    createToken(payload)
      .unwrap()
      .then(() => {
        toast.success("Token successfully created");
        setTokenInfo(initialTokenInfo);
        setWalletsCount(0);
        setMinOrderValue("");
        setSearchSlug("");
        setSearchValue("");
        setRank("");
        setPairName("");
        setDefaultTokenPosition(null);
        setShowPairMsg(false);
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  const onTokenInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTokenInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                {isFetching ? <CircularProgress color="inherit" /> : "Search"}
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
                value={tokenInfo.name}
                onChange={onTokenInfoChange}
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
                value={tokenInfo.symbol}
                onChange={onTokenInfoChange}
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
                value={tokenInfo.coinMarketId}
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
                value={tokenInfo.logo}
                onChange={onTokenInfoChange}
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
                type="number"
                value={minOrderValue}
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
                value={tokenInfo.krakenAssetName}
                onChange={onTokenInfoChange}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="category"
                label="Category"
                name="category"
                value={tokenInfo.category}
                onChange={onTokenInfoChange}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="dateAdded"
                label="Date Added"
                name="dateAdded"
                value={tokenInfo.dateAdded}
                onChange={onTokenInfoChange}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="dateLaunched"
                label="Date Launched"
                name="dateLaunched"
                value={tokenInfo.dateLaunched}
                onChange={onTokenInfoChange}
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
                type="number"
                value={tokenInfo.stakedCoins}
                onChange={onTokenInfoChange}
                disabled={!isSuccess}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={tokenInfo.description}
                onChange={onTokenInfoChange}
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

              {showPairMsg && pairData && !isPairError && (
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
                {isPairFetching ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Search pair"
                )}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
            <FormControl
              required
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
                value={defaultTokenPosition}
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
                <FormControl fullWidth required>
                  <InputLabel id="network-select-label">Network</InputLabel>
                  <Select
                    defaultValue={""}
                    labelId="network"
                    id={`network${value}`}
                    name={`network${value}`}
                    label="Network"
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

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Divider />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "56px" }}
            disabled={isSubmitDisabled}
          >
            {isCreateTokenLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Submit"
            )}
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
            <AddNetwork />
          </ListItem>

          <ListItem>
            <NetworksList />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
