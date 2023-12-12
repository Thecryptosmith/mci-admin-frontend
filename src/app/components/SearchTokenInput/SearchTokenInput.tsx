import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField/TextField";
import { useDebounce } from "@src/common/hooks/useDebounce";
import { useGetTokensQuery } from "@src/lib/redux/services/adminApi";
import { GetTokensQueryParams } from "@src/types/getTokensQueryParams";
import { TokenData } from "@src/types/getTokensRes";
import { OpenSearchStateType, ValueType } from "@src/types/trendingTypes";

type InputValueType = Record<string, string>;

const initialInputValue: InputValueType = {
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
  "6": "",
  "7": "",
  "8": "",
};

type SearchTokenInputProps = {
  rank: string;
  value: ValueType;
  setValue: Dispatch<SetStateAction<ValueType>>;
  openSearch: OpenSearchStateType;
  setOpenSearch: Dispatch<SetStateAction<OpenSearchStateType>>;
};

export default function SearchTokenInput({
  rank,
  value,
  setValue,
  openSearch,
  setOpenSearch,
}: SearchTokenInputProps) {
  const [params, setParams] = useState<GetTokensQueryParams>({
    limit: 10,
  });
  const [inputValue, setInputValue] =
    useState<InputValueType>(initialInputValue);
  const [searchValue, setSearchValue] = useState("");
  const [touchedRank, setTouchedRank] = useState<string>("");
  const debouncedInputValue = useDebounce<string>(searchValue, 500);

  const {
    data: tokensData,
    isLoading: isTokensLoading,
    isFetching: isTokensFetching,
  } = useGetTokensQuery(params, {
    skip: !openSearch[rank],
  });

  useEffect(() => {
    if (touchedRank) {
      setSearchValue(inputValue[touchedRank]);
    }
  }, [inputValue, touchedRank]);

  useEffect(() => {
    if (debouncedInputValue) {
      setParams((prevState) => ({ ...prevState, search: debouncedInputValue }));
    }
  }, [debouncedInputValue]);

  return (
    <Autocomplete
      value={value[rank]}
      onChange={(event: any, newValue: TokenData | null) => {
        setValue((prevState) => ({
          ...prevState,
          [rank]: newValue,
        }));
      }}
      inputValue={inputValue[rank]}
      onInputChange={(event, newInputValue) => {
        setInputValue((prevState) => ({
          ...prevState,
          [rank]: newInputValue,
        }));
        setTouchedRank(rank);
      }}
      id={`select-token${rank}`}
      sx={{ width: 300 }}
      open={openSearch[rank]}
      onOpen={() => {
        setOpenSearch((prevState) => ({
          ...prevState,
          [rank]: true,
        }));
        setParams({ limit: 10 });
      }}
      onClose={() => {
        setOpenSearch((prevState) => ({
          ...prevState,
          [rank]: false,
        }));
        setSearchValue("");
        setTouchedRank("");
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name}
      options={tokensData?.tokens ?? ([] as readonly TokenData[])}
      loading={isTokensLoading || isTokensFetching}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label="Token"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isTokensLoading || isTokensFetching ? (
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
