import * as React from "react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography";
import SearchTokenInput from "@src/app/components/SearchTokenInput/SearchTokenInput";
import {
  useGetTrendingTokensQuery,
  useUpdateTrendingTokensMutation,
} from "@src/lib/redux/services/adminApi";
import { OpenSearchStateType, ValueType } from "@src/types/trendingTypes";
import { UpdateTrendingTokensReqPayload } from "@src/types/updateTrendingTokensReqPayload";

const initialOpenSearch: OpenSearchStateType = {
  "1": false,
  "2": false,
  "3": false,
  "4": false,
  "5": false,
  "6": false,
  "7": false,
  "8": false,
};

const initialValue: ValueType = {
  "1": null,
  "2": null,
  "3": null,
  "4": null,
  "5": null,
  "6": null,
  "7": null,
  "8": null,
};

export default function TrendingList() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] =
    useState<OpenSearchStateType>(initialOpenSearch);
  const [value, setValue] = useState<ValueType>(initialValue);

  const { data: trendingData } = useGetTrendingTokensQuery(undefined, {
    skip: !open,
  });

  const [updateTrendingTokens] = useUpdateTrendingTokensMutation();

  useEffect(() => {
    if (trendingData) {
      const transformedData = Object.values(trendingData.trending).reduce(
        (acc, item) => {
          acc[item.rank] = item.tokenInfo;

          return acc;
        },
        {} as ValueType,
      );

      setValue(transformedData);
    }
  }, [trendingData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: UpdateTrendingTokensReqPayload = {
      trending: Object.entries(value).map((item) => {
        const [rank, token] = item;

        return {
          rank: Number(rank),
          tokenInfo: token ? { id: token.id } : null,
        };
      }),
    };

    updateTrendingTokens(payload)
      .unwrap()
      .then(() => {
        toast.success("Trending tokens successfully updated");
        handleClose();
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        Change Trending List
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ width: 400, minHeight: 730 }}
        >
          <DialogTitle>Change trending list</DialogTitle>
          {trendingData && (
            <DialogContent>
              <List>
                {Object.keys(trendingData.trending).map((rank) => {
                  return (
                    <ListItem key={rank} sx={{ display: "flex", gap: 2 }}>
                      <Box>
                        <Typography>{`${rank}: `}</Typography>
                      </Box>

                      <SearchTokenInput
                        rank={rank}
                        value={value}
                        setValue={setValue}
                        openSearch={openSearch}
                        setOpenSearch={setOpenSearch}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
          )}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
