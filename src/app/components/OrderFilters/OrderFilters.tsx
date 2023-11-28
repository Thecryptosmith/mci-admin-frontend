"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function OrderFilters() {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs(Date.now()).subtract(1, "week"),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));

  const handleFilter = () => {
    console.log({
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  return (
    <Box>
      <List sx={{ px: 2 }}>
        <ListItem disablePadding>
          <Typography variant="overline" sx={{ fontWeight: 500 }}>
            Actions
          </Typography>
        </ListItem>

        <ListItem>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DatePicker
                label="From"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DatePicker
                label="To"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
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
          height: "64px",
          width: "215px",
          p: 1,
        }}
      >
        <Button
          sx={{ width: "100%", height: "100%" }}
          variant={"contained"}
          onClick={handleFilter}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}
