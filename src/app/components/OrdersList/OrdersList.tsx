"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import Paper from "@mui/material/Paper/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TablePagination from "@mui/material/TablePagination/TablePagination";
import TableRow from "@mui/material/TableRow/TableRow";
import OrderFilters from "@src/app/components/OrderFilters/OrderFilters";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { NotificationContext } from "@src/common/globals/Contexts";
import { selectNotificationData, useSelector } from "@src/lib/redux";
import { useGetOrdersQuery } from "@src/lib/redux/services/adminApi";
import { GetOrdersQueryParams } from "@src/types/getOrdersQueryParams";
import { OrderType } from "@src/types/getOrdersRes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrdersList() {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [payload, setPayload] = useState<GetOrdersQueryParams | null>(null);
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [count, setCount] = useState<number>(0);

  const router = useRouter();

  const notificationData = useSelector(selectNotificationData);

  const { data } = useGetOrdersQuery(
    {
      ...payload,
      offset,
      limit,
    },
    {
      skip: !payload,
      refetchOnMountOrArgChange: true,
    },
  );

  const notifyData = useContext(NotificationContext);

  useEffect(() => {
    if (notifyData && orders) {
      const updatedOrders = orders.map((order) => {
        if (order.orderId === +notifyData.body.orderId) {
          return { ...order, status: notifyData.body.newOrderStatus };
        }

        return order;
      });

      setOrders(updatedOrders);
    }
  }, [notifyData]);

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
      setCount(data.count);
    }
  }, [data]);

  useEffect(() => {
    setPayload({
      orderStatuses: [OrderStatusEnum.PENDING_ADMIN_APPROVAL],
    });
  }, []);

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);

    if (nextPage !== 0) {
      setOffset(limit * nextPage);

      return;
    }

    setOffset(0);
  };

  const isDisabled = (order: OrderType) => {
    if (notificationData?.body[order.orderId]) {
      return true;
    }

    if (notifyData && +notifyData?.body.orderId === order.orderId) {
      return !payload?.orderStatuses?.includes(notifyData.body.newOrderStatus);
    }

    return false;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "calc(100% - 320px)",
          paddingBottom: "70px",
        }}
      >
        {orders ? (
          <Paper elevation={3} sx={{ p: 1 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Incoming Asset</TableCell>
                    <TableCell align="center">Incoming Amount</TableCell>
                    <TableCell align="center">Outgoing Asset</TableCell>
                    <TableCell align="center">Outgoing Amount</TableCell>
                    <TableCell align="center">Is now viewing by</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <StyledTableRow
                      key={order.orderId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "td, th": {
                          color: isDisabled(order) ? "#0000004d" : "inherit",
                        },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {order.orderId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.orderType}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(order.date).toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.incomingAsset}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.incomingAmount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.outgoingAsset}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.outgoingAmount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {notificationData?.body[order.orderId]
                          ?.reviewingEmail ?? ""}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          disabled={isDisabled(order)}
                          variant="contained"
                          onClick={() => {
                            router.push(
                              `/orders/${order.orderType}/${order.orderId}`,
                            );
                          }}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

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
          </Paper>
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
          <OrderFilters
            setPayload={setPayload}
            setPage={setPage}
            setOffset={setOffset}
          />
        </Drawer>
      </Box>
    </>
  );
}
