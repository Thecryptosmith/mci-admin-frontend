import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box/Box";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Chip from "@mui/material/Chip/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { CurrencyCode } from "@src/common/emuns/CurrencyCodeEnum";
import { useDebounce } from "@src/common/hooks/useDebounce";
import {
  useGetNetworkTokensQuery,
  useGetTokensQuery,
} from "@src/lib/redux/services/adminApi";
import { GetTokensQueryParams } from "@src/types/getTokensQueryParams";
import { TokenData } from "@src/types/getTokensRes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const currencies: TokenData[] = Object.values(CurrencyCode).map(
  (currency, i) => {
    return {
      id: Date.now() + i,
      name: currency,
      slug: currency,
    };
  },
);

type AssetsSelectProps = {
  label: string;
  selectedValues: TokenData[];
  setSelectedValues: Dispatch<SetStateAction<TokenData[]>>;
  isNetworkTokens?: boolean;
  networkId?: number;
};

export default function AssetsSelect({
  label,
  selectedValues,
  setSelectedValues,
  isNetworkTokens = false,
  networkId = 0,
}: AssetsSelectProps) {
  const [params, setParams] = useState<GetTokensQueryParams | null>({
    limit: 10,
  });
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<TokenData[]>(
    isNetworkTokens ? [] : currencies,
  );
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce<string>(inputValue, 500);

  const { data, isLoading, isFetching } = useGetTokensQuery(params!, {
    skip: !open || isNetworkTokens,
  });

  const {
    data: networkTokensData,
    isLoading: isNetworkTokensLoading,
    isFetching: isNetworkTokensFetching,
  } = useGetNetworkTokensQuery(
    { ...params!, id: networkId },
    {
      skip: !open || !isNetworkTokens,
    },
  );

  const loading =
    open &&
    (isLoading ||
      isFetching ||
      isNetworkTokensLoading ||
      isNetworkTokensFetching);

  useEffect(() => {
    if (debouncedInputValue) {
      setParams({ search: inputValue });
    }

    if (open && !inputValue) {
      setParams({ limit: 10 });
    }
  }, [open, debouncedInputValue]);

  useEffect(() => {
    if (inputValue && data) {
      setAssets(data.tokens);

      return;
    }

    if (data) {
      setAssets([...currencies, ...data.tokens]);
    }
  }, [inputValue, data]);

  useEffect(() => {
    if (inputValue && networkTokensData) {
      setAssets(networkTokensData.tokensInfo);

      return;
    }

    if (networkTokensData) {
      setAssets(networkTokensData.tokensInfo);
    }
  }, [inputValue, networkTokensData]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active && data) {
      setAssets([...currencies, ...data.tokens]);
    }

    if (active && networkTokensData) {
      setAssets(networkTokensData.tokensInfo);
    }

    return () => {
      active = false;
    };
  }, [networkTokensData, data, loading]);

  const handleChipDelete = (chipToDelete: TokenData) => () => {
    setSelectedValues((prevState) =>
      prevState.filter((token) => token.id !== chipToDelete.id),
    );
  };

  return (
    <Autocomplete
      value={selectedValues}
      onChange={(event: any, newValue) => setSelectedValues(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      multiple
      disableCloseOnSelect
      id="assets-select"
      sx={{ width: isNetworkTokens ? "100%" : 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
        setParams({
          limit: 10,
        });
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={assets}
      filterOptions={(x) => x}
      loading={loading}
      renderTags={(value) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 1 }}>
          {value.map((option) => (
            <Chip
              key={option.id}
              label={option.name}
              onDelete={handleChipDelete(option)}
            />
          ))}
        </Box>
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            key={option.id}
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
