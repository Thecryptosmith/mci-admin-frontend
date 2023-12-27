import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Dayjs } from "dayjs";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AssetsSelect from "@src/app/components/OrderFilters/AssetsSelect";
import OrderStatusesSelect from "@src/app/components/OrderFilters/OrderStatusesSelect";
import OrderTypesSelect from "@src/app/components/OrderFilters/OrderTypesSelect";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { GetOrdersQueryParams } from "@src/types/getOrdersQueryParams";
import { TokenData } from "@src/types/getTokensRes";

import "dayjs/locale/en-gb";

type OrderFiltersProps = {
  userId: string | null;
  setPayload: Dispatch<SetStateAction<GetOrdersQueryParams | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function OrderFilters({
  userId,
  setPayload,
  setPage,
  setOffset,
}: OrderFiltersProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [orderStatuses, setOrderStatuses] = React.useState<string[]>([]);
  const [orderTypes, setOrderTypes] = React.useState<string[]>([]);
  const [selectedIncomingAssets, setSelectedIncomingAssets] = useState<
    TokenData[]
  >([]);
  const [selectedOutgoingAssets, setSelectedOutgoingAssets] = useState<
    TokenData[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setOrderStatuses([OrderStatusEnum.PENDING_ADMIN_APPROVAL]);
    }
  }, [userId]);

  const convertAssetsToPayload = (assets: TokenData[]) => {
    return assets.map((asset) => asset.slug);
  };

  const handleFilter = () => {
    setPage(0);
    setOffset(0);
    setPayload((prevState) => ({
      ...prevState,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      orderStatuses: orderStatuses as OrderStatusEnum[],
      orderTypes: orderTypes as OrderTypeEnum[],
      incomingAssets: convertAssetsToPayload(selectedIncomingAssets),
      outgoingAssets: convertAssetsToPayload(selectedOutgoingAssets),
    }));
  };

  const handleResetFilters = () => {
    router.replace("/orders");

    setPage(0);
    setOffset(0);
    setPayload({});
    setStartDate(null);
    setEndDate(null);
    setOrderStatuses([]);
    setOrderTypes([]);
    setSelectedIncomingAssets([]);
    setSelectedOutgoingAssets([]);
  };

  return (
    <Box>
      <List sx={{ px: 2 }}>
        <ListItem disablePadding>
          <Typography variant="overline" sx={{ fontWeight: 500 }}>
            Filters
          </Typography>
        </ListItem>

        <ListItem>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DateTimePicker
                label="From"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DateTimePicker
                label="To"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
        </ListItem>

        <ListItem>
          <OrderStatusesSelect
            orderStatuses={orderStatuses}
            setOrderStatuses={setOrderStatuses}
          />
        </ListItem>

        <ListItem>
          <OrderTypesSelect
            orderTypes={orderTypes}
            setOrderTypes={setOrderTypes}
          />
        </ListItem>

        <ListItem>
          <AssetsSelect
            label={"Incoming assets"}
            selectedValues={selectedIncomingAssets}
            setSelectedValues={setSelectedIncomingAssets}
          />
        </ListItem>

        <ListItem>
          <AssetsSelect
            label={"Outgoing assets"}
            selectedValues={selectedOutgoingAssets}
            setSelectedValues={setSelectedOutgoingAssets}
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
            onClick={handleFilter}
          >
            Apply Filters
          </Button>
        </>
      </Box>
    </Box>
  );
}
