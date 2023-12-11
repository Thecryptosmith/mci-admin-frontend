import * as React from "react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { nestedModalsStyle } from "@src/common/style/nestedModalsStyle";
import { useUpdateNetworkMutation } from "@src/lib/redux/services/adminApi";
import { Network } from "@src/types/getNetworksListRes";

export default function EditNetworkModal({ network }: { network: Network }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState<string>(network.name);
  const [symbol, setSymbol] = useState<string>(network.symbol);
  const [logo, setLogo] = useState<string>(network.logo);

  const [updateNetwork] = useUpdateNetworkMutation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName(network.name);
    setSymbol(network.symbol);
    setLogo(network.logo);

    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    updateNetwork({
      id: network.id,
      name,
      symbol,
      logo,
    })
      .unwrap()
      .then(() => {
        toast.success("Network successfully updated");
        handleClose();
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  return (
    <>
      <EditIcon color="info" onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...nestedModalsStyle, width: 600 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <h2 id="child-modal-title">Edit network</h2>
          <p id="child-modal-description">{`Network ID: ${network.id}`}</p>

          <Box sx={{ mb: 2 }}>
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
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
