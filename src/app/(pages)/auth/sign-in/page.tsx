"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useErrorMessage } from "@src/common/hooks/useErrorMessage";
import { setUser, useDispatch } from "@src/lib/redux";
import { useSignInMutation } from "@src/lib/redux/services/authApi";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signInAdmin, { data, error, isLoading }] = useSignInMutation();
  const [checked, setChecked] = useState<boolean>(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mfaCode, setMfaCode] = useState<string>("");
  const [otpUrl, setOtpUrl] = useState<string>("");
  const [secretCode, setSecretCode] = useState<string>("");

  const { errorMessage, resetErrorMessage } = useErrorMessage(error);

  useEffect(() => {
    resetErrorMessage();
  }, [email, password, mfaCode]);

  useEffect(() => {
    if (data?.url && data?.secretCode && !checked) {
      setOtpUrl(data?.url);
      setSecretCode(data?.secretCode);
      setIsPopUpOpen(true);

      return;
    }

    if (data) {
      dispatch(setUser({ ...data, email }));
      router.push("/dashboard");
    }
  }, [data, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password && !checked) {
      signInAdmin({
        email,
        password,
      })
        .unwrap()
        .then((response) => {
          dispatch(setUser({ ...response, email }));
        })
        .catch((e) => {
          console.log(e);
        });

      return;
    }

    signInAdmin({
      email,
      password,
      mfaCode,
    })
      .unwrap()
      .then((response) => {
        dispatch(setUser({ ...response, email }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
  };

  const handlePopUpConfirm = () => {
    if (email && password && mfaCode.length === 6) {
      signInAdmin({
        email,
        password,
        mfaCode,
      });
    }
  };

  const handleMfaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 6) return;

    setMfaCode(event.target.value);
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  inputProps={{ "aria-label": "controlled" }}
                  color="primary"
                />
              }
              label="I have MFA code"
            />

            {checked && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="mfaCode"
                label="MFA Code"
                type="number"
                id="mfaCode"
                autoComplete="mfaCode"
                value={mfaCode}
                onChange={handleMfaChange}
              />
            )}

            {errorMessage ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !email ||
                !password ||
                password.length < 8 ||
                (checked && mfaCode.length < 6) ||
                isLoading
              }
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>

      <Dialog open={isPopUpOpen}>
        <DialogTitle>Setup MFA</DialogTitle>
        <DialogContent>
          {otpUrl && (
            <>
              <DialogContentText textAlign={"center"} mb={"10px"}>
                Scan QR-code and confirm verification code
              </DialogContentText>

              <div
                style={{
                  height: "auto",
                  margin: "0 auto 10px",
                  maxWidth: 256,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={otpUrl}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </>
          )}

          {secretCode && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <DialogContentText>OR</DialogContentText>

              <DialogContentText mb={"10px"}>
                Copy this key and use it in your authenticator application
              </DialogContentText>

              <DialogContentText>{secretCode}</DialogContentText>
            </Box>
          )}

          <TextField
            autoFocus
            margin="dense"
            id="mfaCode"
            label="MFA verificaton code"
            type="text"
            fullWidth
            variant="standard"
            value={mfaCode}
            error={mfaCode.length < 6 || mfaCode.length > 6}
            onChange={handleMfaChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopUpClose}>Cancel</Button>
          <Button onClick={handlePopUpConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
