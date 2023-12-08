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
import { useGetTokensListQuery } from "@src/lib/redux/services/adminApi";

export default function TokensList() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data } = useGetTokensListQuery({
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
              id="search-token"
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
                  <TableCell align="center">Symbol</TableCell>
                  <TableCell align="center">Kraken Asset Name</TableCell>
                  <TableCell align="right">Networks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.tokens.map((token) => (
                  <TableRow
                    key={token.id}
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
                          src={token.logo}
                          width={32}
                          height={32}
                          alt="token logo"
                        />

                        <Typography variant="body1">{token.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{token.symbol}</TableCell>
                    <TableCell align="center">
                      {token.krakenAssetName}
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        {token.networks.map((network) => (
                          <Image
                            title={network.name}
                            key={network.id}
                            src={network.logo}
                            width={32}
                            height={32}
                            alt="token logo"
                          />
                        ))}
                      </Box>
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
            <Link href={"/tokens/create"} target="_blank">
              <Button variant={"contained"}>Add new token</Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
