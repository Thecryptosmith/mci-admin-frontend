"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import TableRow from "@mui/material/TableRow/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGetAllWalletProvidersQuery } from "@src/lib/redux/services/adminApi";

export default function WalletProvidersList() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data } = useGetAllWalletProvidersQuery({
    limit,
    offset: page !== 0 ? page * limit : 0,
    search,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
      setSearch("");
    }
  };

  const handleSearch = () => {
    setSearch(searchValue);
    setPage(0);
  };

  return (
    <Box>
      {data ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "calc(100% - 220px)",
            paddingBottom: "70px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              sx={{ width: 200 }}
              id="search-wallet-provider"
              label="Search"
              variant="outlined"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
            />

            <Button variant={"contained"} onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Url</TableCell>
                  <TableCell align="center">Overall Ranking</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">About</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.walletProviders.map((provider) => (
                  <TableRow
                    key={provider.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Image
                          src={provider.logo.key}
                          width={32}
                          height={32}
                          alt="wallet provider logo"
                        />

                        <Typography variant="body1">{provider.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      title={provider.description}
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: 150,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {provider.description}
                    </TableCell>
                    <TableCell
                      align="center"
                      title={provider.url}
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: 150,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {provider.url}
                    </TableCell>
                    <TableCell align="center">
                      {provider.overallRanking}
                    </TableCell>
                    <TableCell align="center">{provider.rating}</TableCell>
                    <TableCell align="center">{provider.category}</TableCell>
                    <TableCell
                      align="center"
                      title={provider.about}
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: 150,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {provider.about}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        href={`/wallet-providers/${provider.id}`}
                        target="_blank"
                      >
                        <Button variant="contained">Edit</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        <div>No data</div>
      )}

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
            <Link
              href={"/wallet-providers/create"}
              target="_blank"
              style={{ width: "100%" }}
            >
              <Button
                variant={"contained"}
                color="success"
                sx={{ width: "100%" }}
              >
                Add new wallet provider
              </Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
