import * as React from "react";
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Modal from "@mui/material/Modal/Modal";
import Typography from "@mui/material/Typography";
import { useGetComplianceRecordQuery } from "@src/lib/redux/services/adminApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type ComplianceRecordModalProps = {
  id: number;
};

export default function ComplianceRecordModal({
  id,
}: ComplianceRecordModalProps) {
  const [open, setOpen] = useState(false);

  const { data } = useGetComplianceRecordQuery(id, { skip: !open });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Info
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Compliance record</Typography>

          <Divider sx={{ mt: 2, mb: 2 }} />

          {data ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h6">Compliance documents: </Typography>

                <List dense={false}>
                  {data.complianceRecord.complianceDocuments.map(
                    (document, index) => (
                      <ListItem key={document.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`#${index + 1}: ${document.type}`}
                          sx={{ mr: 2 }}
                        />

                        <Link href={document.file.key} target="_blank">
                          <Button variant="outlined">View</Button>
                        </Link>
                      </ListItem>
                    ),
                  )}
                </List>
              </Box>

              <Box>
                <Typography variant="h6">Compliance tokens: </Typography>

                {data.complianceRecord.complianceTokens.map(
                  (complianceToken) => (
                    <Box
                      key={complianceToken.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          mb: 2,
                          mt: 2,
                        }}
                      >
                        <Image
                          src={complianceToken.token.logo}
                          width={32}
                          height={32}
                          alt="token logo"
                        />

                        <Typography variant="body1">
                          {complianceToken.token.name}
                        </Typography>
                      </Box>

                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body1">
                          {complianceToken.amount}
                        </Typography>
                      </Box>
                    </Box>
                  ),
                )}
              </Box>
            </Box>
          ) : (
            <div>No data</div>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}
