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
import { useDebounce } from "@src/common/hooks/useDebounce";
import { useGetTokensQuery } from "@src/lib/redux/services/adminApi";
import { ComplianceTokenType } from "@src/types/compliance-records/complianceToken";
import { GetTokensQueryParams } from "@src/types/getTokensQueryParams";
import { TokenData } from "@src/types/getTokensRes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type TokenSearchSelectInputProps = {
  currentToken?: ComplianceTokenType;
  setTokens?: Dispatch<SetStateAction<ComplianceTokenType[]>>;
};

export default function TokenSearchSelectInput({
  currentToken,
  setTokens,
}: TokenSearchSelectInputProps) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<GetTokensQueryParams | null>({
    limit: 10,
  });
  const [assets, setAssets] = useState<TokenData[]>([]);
  const [selectedValue, setSelectedValue] = useState<TokenData | null>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce<string>(inputValue, 500);

  const { data, isLoading, isFetching } = useGetTokensQuery(params!, {
    skip: !open,
  });

  const loading = open && (isLoading || isFetching);

  useEffect(() => {
    if (selectedValue && setTokens && currentToken) {
      setTokens((prevState) =>
        prevState.map((token) => {
          if (currentToken.id === token.id) {
            token.tokenId = selectedValue.id;

            return token;
          }

          return token;
        }),
      );
    }
  }, [currentToken, selectedValue, setTokens]);

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
      setAssets(data.tokens);
    }
  }, [inputValue, data]);

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event: any, newValue) => setSelectedValue(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disableCloseOnSelect
      id="assets-select"
      sx={{ width: 600 }}
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
            <Chip key={option.id} label={option.name} />
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
          label={"Token"}
          required
          name="token"
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
