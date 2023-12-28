import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography/Typography";
import SimpleMultiSelect from "@src/app/components/SimpleMultiSelect/SimpleMultiSelect";
import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";
import { GetAllVerificationRequestsQueryParams } from "@src/types/verification-requests/getAllVerificationRequestsQueryParams";

const availableUserVerificationRequestStatuses = Object.values(
  UserVerificationRequestStatusEnum,
);

type VerificationRequestFiltersProps = {
  setPayload: Dispatch<
    SetStateAction<GetAllVerificationRequestsQueryParams | null>
  >;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function VerificationRequestFilters({
  setPayload,
  setPage,
  setOffset,
}: VerificationRequestFiltersProps) {
  const [
    selectedUserVerificationRequestStatuses,
    setSelectedUserVerificationRequestStatuses,
  ] = useState<string[]>([]);

  console.log(selectedUserVerificationRequestStatuses);

  const handleFilterApply = () => {
    setPage(0);
    setOffset(0);
    setPayload((prevState) => ({
      ...prevState,
      statuses: selectedUserVerificationRequestStatuses,
    }));
  };

  const handleResetFilters = () => {
    setPage(0);
    setOffset(0);
    setPayload({});
    setSelectedUserVerificationRequestStatuses([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="overline" sx={{ fontWeight: 500, p: 2 }}>
        Filters
      </Typography>

      <List>
        <ListItem>
          <SimpleMultiSelect
            label={"Status"}
            itemsList={availableUserVerificationRequestStatuses}
            selectedItems={selectedUserVerificationRequestStatuses}
            setSelectedItems={setSelectedUserVerificationRequestStatuses}
          />
        </ListItem>
      </List>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "130px",
          width: "315px",
          p: 1,
        }}
      >
        <>
          <Button
            sx={{ width: "100%", mb: 2 }}
            variant={"outlined"}
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>

          <Button
            sx={{ width: "100%", height: "100%" }}
            variant={"contained"}
            onClick={handleFilterApply}
          >
            Apply Filters
          </Button>
        </>
      </Box>
    </Box>
  );
}
