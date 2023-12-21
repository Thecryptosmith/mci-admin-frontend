"use client";

import * as React from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

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
import EmptyTextarea from "@src/app/components/CustomTextArea/CustomTextArea";
import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import {
  useCreateWalletProviderLogoMutation,
  useCreateWalletProviderMutation,
  useGetWalletProviderQuery,
  useUpdateWalletProviderMutation,
} from "@src/lib/redux/services/adminApi";
import {
  NetworkTokensInfo,
  NetworkWithTokens,
  NetworkWithTokensPayload,
} from "@src/types/wallet-providers/network-with-tokens";
import { UpdateWalletProviderReqPayload } from "@src/types/wallet-providers/updateWalletProviderReqPayload";

const initialNetworkWithTokens = {
  id: Date.now().toString(),
  data: {
    id: 0,
    tokensInfo: null,
    yield: null,
  },
};

type CreateWalletProviderFormProps = {
  id?: number;
  isEdit?: boolean;
};

export default function CreateWalletProviderForm({
  id,
  isEdit = false,
}: CreateWalletProviderFormProps) {
  const [providerName, setProviderName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<WalletProviderCategoryEnum | "">("");
  const [overallRanking, setOverallRanking] = useState<string | number>("");
  const [rating, setRating] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [fileId, setFileId] = useState<number>(0);
  const [networksWithTokens, setNetworksWithTokens] = useState<
    NetworkWithTokens[]
  >([initialNetworkWithTokens]);

  const [createWalletProvider, { isLoading }] =
    useCreateWalletProviderMutation();
  const [updateWalletProvider] = useUpdateWalletProviderMutation();
  const [createWalletProviderLogo] = useCreateWalletProviderLogoMutation();

  const { data } = useGetWalletProviderQuery(id!, { skip: !isEdit || !id });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isEdit && data) {
      setProviderName(data.name);
      setDescription(data.description);
      setUrl(data.url);
      setCategory(data.category);
      setOverallRanking(data.overallRanking);
      setRating(data.rating);
      setAbout(data.about);
      setLogo(data.logo.key);
      setFileId(data.logo.id);

      setNetworksWithTokens(data.networks);
    }
  }, [isEdit, data]);

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

  const handleFileUpload = () => {
    // @ts-ignore
    if (formRef.current && formRef.current.elements["file"].value) {
      const data = new FormData(formRef.current);

      createWalletProviderLogo(data)
        .unwrap()
        .then((data) => {
          toast.success("Logo created. Don't forget to save form");

          setLogo(data.key);
          setFileId(data.id);
        })
        .catch((e) => {
          toast.error(JSON.stringify(e?.data?.message));
        });
    } else {
      toast.error("Attach some file first");
    }
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    const payload: UpdateWalletProviderReqPayload = {
      id: id!,
      name: data.get("name") as string,
      url: data.get("url") as string,
      about: data.get("about") as string,
      description: data.get("description") as string,
      overallRanking: Number(data.get("overallRanking")),
      rating: Number(data.get("rating")),
      file: fileId,
      category: category as WalletProviderCategoryEnum,
      networks: newNetworksWithTokens,
    };

    updateWalletProvider(payload)
      .unwrap()
      .then(() => {
        toast.success("Wallet provider successfully updated");
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
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

        setProviderName("");
        setDescription("");
        setUrl("");
        setOverallRanking("");
        setRating("");
        setAbout("");
        setLogo("");
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
        {isEdit ? "Edit wallet provider" : "Create wallet provider"}
      </Typography>

      <Box
        component={"form"}
        onSubmit={isEdit ? handleEditSubmit : handleSubmit}
        sx={{ mt: 3, width: "100%" }}
        ref={formRef}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="url"
              label="Url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
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
              value={overallRanking}
              onChange={(e) => setOverallRanking(e.target.value)}
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
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            {isEdit && data && (
              <EmptyTextarea
                name={"about"}
                placeholder={"About"}
                value={data.about}
                setValue={setAbout}
              />
            )}

            {!isEdit && (
              <EmptyTextarea
                name={"about"}
                placeholder={"About"}
                value={about}
                setValue={setAbout}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            {logo && (
              <Image src={logo} alt="provider logo" width={64} height={64} />
            )}
            <Typography>
              Attach wallet provider logo * (exact size: 64x64 pixels; allowed
              types: jpg, jpeg, png)
            </Typography>
            <Input required={!isEdit} type={"file"} name="file" id="file" />

            {isEdit && (
              <Button
                sx={{ ml: 2 }}
                variant="outlined"
                onClick={handleFileUpload}
              >
                Upload new logo
              </Button>
            )}
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
              isEdit={isEdit}
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
