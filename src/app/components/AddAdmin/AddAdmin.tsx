"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CustomAlert from "@src/app/components/CustomAlert/CustomAlert";
import { useErrorMessage } from "@src/common/hooks/useErrorMessage";
import { useCreateAdminMutation } from "@src/lib/redux/services/adminApi";

export default function AddAdmin() {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [createAdmin, { error }] = useCreateAdminMutation();

  const { errorMessage } = useErrorMessage(error);

  useEffect(() => {
    if (!!error) {
      setOpen(true);
    }
  }, [error]);

  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
    setEmail("");
    setPassword("");
  };

  const handlePopUpOpen = () => {
    setIsPopUpOpen(true);
  };

  const handleCreateAdmin = async () => {
    await createAdmin({ email, password });

    handlePopUpClose();
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handlePopUpOpen}>
          Create new admin
        </Button>

        <Dialog open={isPopUpOpen}>
          <DialogTitle>Create new admin</DialogTitle>
          <DialogContent>
            <>
              <DialogContentText textAlign={"center"} mb={"10px"}>
                Enter email and password
              </DialogContentText>
            </>

            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              helperText="Only letters and numbers, min. 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopUpClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreateAdmin}
              disabled={!email || !password || password.length < 8}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {open && (
        <CustomAlert severity="error" isOpen={open} message={errorMessage} />
      )}
    </>
  );
}
