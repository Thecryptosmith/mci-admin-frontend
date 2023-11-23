"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField/TextField";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetUsersFilterEnum } from "@src/common/emuns/GetUsersFilterEnum";
import { useGetUsersListQuery } from "@src/lib/redux/services/adminApi";
import { GetUsersQueryParams } from "@src/types/getUsersQueryParams";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    sortable: false,
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    type: "string",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const userId = params.api.getRowParams(params.id).row.id;

      return (params.row = <ActionButton id={userId} />);
    },
  },
];

function ActionButton({ id }: { id: string | number }) {
  const router = useRouter();

  const handleViewClick = (id: string | number) => {
    router.push(`/users/${id}`);
  };

  return (
    <Button
      variant="contained"
      onClick={() => {
        handleViewClick(id);
      }}
    >
      View
    </Button>
  );
}

export default function UsersList() {
  const [filter, setFilter] = useState<GetUsersFilterEnum>(
    GetUsersFilterEnum.ALL,
  );
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [params, setParams] = useState<GetUsersQueryParams>({
    filter,
    limit: paginationModel.pageSize,
    offset: paginationModel.page,
  });

  const firstRender = useRef(true);

  const { data, isLoading } = useGetUsersListQuery(params);

  const [rowCountState, setRowCountState] = useState(data?.count || 0);

  useEffect(() => {
    if (!firstRender.current) {
      setParams({
        filter,
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
      });
    }

    firstRender.current = false;
  }, [paginationModel, email, filter]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.count !== undefined ? data?.count : prevRowCountState,
    );
  }, [data?.count, setRowCountState]);

  useEffect(() => {
    if (!firstRender.current) {
      if (email && isEmailValid(email)) {
        setEmailError(false);
        setParams((prevState) => ({
          ...prevState,
          email,
        }));
      } else if (email && !isEmailValid(email)) {
        setEmailError(true);
      } else if (!email) {
        if ("email" in params) {
          const { email, ...rest } = params;

          setParams(rest);

          return;
        }

        setParams(params);
        setEmailError(false);
      }
    }
  }, [email]);
  const handleChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as GetUsersFilterEnum);
  };

  const isEmailValid = (email: string) => {
    const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return regEx.test(email);
  };

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={handleChangeFilter}
          >
            <MenuItem value={GetUsersFilterEnum.ALL}>All</MenuItem>
            <MenuItem value={GetUsersFilterEnum.PENDING}>Pending</MenuItem>
            <MenuItem value={GetUsersFilterEnum.APPROVED}>Approved</MenuItem>
            <MenuItem value={GetUsersFilterEnum.UNAPPROVED}>
              Unapproved
            </MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <TextField
            error={emailError}
            id="email"
            label="Search by email"
            variant="outlined"
            type="email"
            helperText={emailError ? "Should be a valid email" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>

      {data ? (
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rowCount={rowCountState}
            rows={data.users}
            columns={columns}
            loading={isLoading}
            paginationModel={paginationModel}
            paginationMode={"server"}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 50]}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
