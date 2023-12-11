import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import EditNetworkModal from "@src/app/components/EditNetworkModal/EditNetworkModal";
import { nestedModalsStyle } from "@src/common/style/nestedModalsStyle";
import {
  useDeleteNetworkMutation,
  useGetAllNetworksQuery,
} from "@src/lib/redux/services/adminApi";

export default function NetworksList() {
  const [open, setOpen] = useState(false);

  const { data } = useGetAllNetworksQuery();

  const [deleteNetwork] = useDeleteNetworkMutation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    deleteNetwork(id)
      .unwrap()
      .then(() => {
        toast.success("Network successfully deleted");
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="warning"
        sx={{ width: "100%" }}
      >
        Edit networks
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...nestedModalsStyle, width: 500 }}>
          <h2 id="parent-modal-title">Networks</h2>

          <List sx={{ maxHeight: "70vh", overflow: "auto", mb: 2 }}>
            {data &&
              data.networks.map((network) => (
                <ListItem
                  key={network.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    transition: "ease 300ms",
                    "&:hover": {
                      bgcolor: "lightgrey",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Image
                      title={network.name}
                      src={network.logo}
                      width={32}
                      height={32}
                      alt="token logo"
                    />

                    <Typography>
                      {`${network.name} (${network.symbol})`}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <EditNetworkModal network={network} />

                    <DeleteIcon
                      color="error"
                      onClick={() => handleDelete(network.id)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}
