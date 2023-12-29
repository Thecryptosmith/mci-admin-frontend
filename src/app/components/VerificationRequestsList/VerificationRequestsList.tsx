"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import TableRow from "@mui/material/TableRow";
import VerificationRequestFilters from "@src/app/components/VerificationRequestFilters/VerificationRequestFilters";
import { useGetAllVerificationRequestsQuery } from "@src/lib/redux/services/adminApi";
import { GetAllVerificationRequestsQueryParams } from "@src/types/compliance-requests/getAllVerificationRequestsQueryParams";
import { VerificationRequestsItem } from "@src/types/compliance-requests/getAllVerificationRequestsRes";

export default function VerificationRequestsList() {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [payload, setPayload] =
    useState<GetAllVerificationRequestsQueryParams | null>(null);
  const [requests, setRequests] = useState<VerificationRequestsItem[]>([]);
  const [orderDirection, setOrderDirection] = useState<boolean>(false);
  const [orderField, setOrderField] = useState<string>("createdAt");

  const { data } = useGetAllVerificationRequestsQuery(
    {
      ...payload,
      offset,
      limit,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (data) {
      setRequests(data.requests);
      setCount(data.count);
    }
  }, [data]);

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);

    if (nextPage !== 0) {
      setOffset(limit * nextPage);

      return;
    }

    setOffset(0);
  };

  const handleOrderDirection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setOrderField(e.currentTarget.id);

    if (e.currentTarget.id === orderField) {
      setOrderDirection((prevState) => !prevState);

      setPayload((prevState) => ({
        ...prevState,
        orderField,
        orderDirection: !orderDirection ? "ASC" : "DESC",
      }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "calc(100% - 320px)",
        paddingBottom: "70px",
      }}
    >
      {data ? (
        <TableContainer component={Paper} sx={{ p: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="createdAt" onClick={handleOrderDirection}>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                  >
                    <span>Created at</span>

                    {orderField === "createdAt" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {orderDirection ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Reviewing by</TableCell>
                <TableCell align="center">SoW</TableCell>
                <TableCell
                  align="center"
                  id="sowEstimatedNetWorth"
                  onClick={handleOrderDirection}
                >
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                  >
                    <span>SoW value</span>

                    {orderField === "sowEstimatedNetWorth" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {orderDirection ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">SoC</TableCell>
                <TableCell
                  align="center"
                  id="socCryptoValue"
                  onClick={handleOrderDirection}
                >
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                  >
                    <span>SoC value</span>

                    {orderField === "socCryptoValue" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {orderDirection ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(request.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {request.status}
                  </TableCell>
                  <TableCell align="center">{request.user.email}</TableCell>
                  <TableCell align="center">
                    {request.admin?.email ?? ""}
                  </TableCell>
                  <TableCell align="center">
                    {request.sowCompleted ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {request.sowEstimatedNetWorth ?? ""}
                  </TableCell>
                  <TableCell align="center">
                    {request.socCompleted ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {request.socCryptoValue ?? ""}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      href={`compliance-requests/${request.id}`}
                      target="_blank"
                    >
                      <Button variant="contained">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider />

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={(event, page) => {
              handleChangePage(page);
            }}
          />
        </TableContainer>
      ) : (
        <div>No data</div>
      )}

      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
            top: ["48px", "56px", "64px"],
            height: "auto",
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <VerificationRequestFilters
          setPayload={setPayload}
          setPage={setPage}
          setOffset={setOffset}
        />
      </Drawer>
    </Box>
  );
}
