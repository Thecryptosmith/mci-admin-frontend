import * as React from "react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useCreateNetworkMutation } from "@src/lib/redux/services/adminApi";

export default function AddNetwork() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [logo, setLogo] = useState<string>("");

  const [createNetwork] = useCreateNetworkMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName("");
    setSymbol("");
    setLogo("");

    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    createNetwork({
      name,
      symbol,
      logo,
    })
      .unwrap()
      .then(() => {
        toast.success("New network successfully added");
        handleClose();
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Add new network
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <DialogTitle>Add new network</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              required
              margin="dense"
              id="symbol"
              label="Symbol"
              type="text"
              fullWidth
              variant="standard"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />

            <TextField
              required
              margin="dense"
              id="logo"
              label="Logo (URL)"
              type="text"
              fullWidth
              variant="standard"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
