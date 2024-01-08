import * as React from "react";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ComplianceDocument from "@src/app/components/CreateComplianceRecordModalForm/ComplianceDocument/ComplianceDocument";
import ComplianceRequestComponent from "@src/app/components/CreateComplianceRecordModalForm/ComplianceRequest/ComplianceRequestComponent";
import ComplianceToken from "@src/app/components/CreateComplianceRecordModalForm/ComplianceToken/ComplianceToken";
import { EmploymentStatus } from "@src/common/emuns/EmploymentStatusEnum";
import { UserLimitTypeEnum } from "@src/common/emuns/UserLimitTypeEnum";
import {
  useCreateComplianceRecordWithRequestMutation,
  useGetActiveUserLimitQuery,
} from "@src/lib/redux/services/adminApi";
import { ComplianceTokenType } from "@src/types/compliance-records/complianceToken";
import { UserLimit } from "@src/types/compliance-records/userLimit";
import { ComplianceRequest } from "@src/types/compliance-requests/complianceRequest";

const userLimitTypes = Object.values(UserLimitTypeEnum);

type CreateComplianceRecordModalFormProps = {
  userId: number;
  buttonTitle: string;
  userVerificationRequestId?: number;
  withRequest?: boolean;
};

export default function CreateComplianceRecordModalForm({
  userId,
  buttonTitle,
  userVerificationRequestId,
  withRequest = false,
}: CreateComplianceRecordModalFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [sofLimitType, setSofLimitType] = useState<UserLimitTypeEnum>();
  const [sofOrderLimit, setSofOrderLimit] = useState<number>(0);
  const [sofTradingLimit, setSofTradingLimit] = useState<number>(0);
  const [sofComment, setSofComment] = useState<string>("");
  const [socLimitType, setSocLimitType] = useState<UserLimitTypeEnum>();
  const [socOrderLimit, setSocOrderLimit] = useState<number>(0);
  const [socTradingLimit, setSocTradingLimit] = useState<number>(0);
  const [socComment, setSocComment] = useState<string>("");
  const [sowEmploymentStatus, setSowEmploymentStatus] =
    useState<EmploymentStatus>();
  const [complianceDocuments, setComplianceDocuments] = useState<
    { id: string }[]
  >([]);
  const [complianceTokens, setComplianceTokens] = useState<
    ComplianceTokenType[]
  >([]);

  const form = useRef<HTMLFormElement>(null);

  const { data } = useGetActiveUserLimitQuery(userId, { skip: !open });

  const [createComplianceRecordWithRequest] =
    useCreateComplianceRecordWithRequestMutation();

  useEffect(() => {
    if (data) {
      setSofLimitType(data.sofLimitType);
      setSofOrderLimit(data.sofOrderLimit);
      setSofTradingLimit(data.sofTradingLimit);

      setSocLimitType(data.socLimitType);
      setSocOrderLimit(data.socOrderLimit);
      setSocTradingLimit(data.socTradingLimit);
    }
  }, [data]);

  const handleSelectChange = (e: SelectChangeEvent) => {
    if (e.target.name === "sofLimitType") {
      setSofLimitType(e.target.value as UserLimitTypeEnum);

      return;
    }

    setSocLimitType(e.target.value as UserLimitTypeEnum);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitWithRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current && sofLimitType && socLimitType) {
      const formData = new FormData(form.current);

      userVerificationRequestId &&
        formData.append(
          "userVerificationRequestId",
          `${userVerificationRequestId}`,
        );

      const userLimit: UserLimit = {
        sofLimitType,
        sofOrderLimit,
        sofTradingLimit,
        socLimitType,
        socOrderLimit,
        socTradingLimit,
      };

      const sowAnnualIncome = formData.get("sowAnnualIncome");
      const sowEstimatedNetWorth = formData.get("sowEstimatedNetWorth");
      const sowSourceOfNetWorth = formData.get("sowSourceOfNetWorth");
      const socCryptoExperience = formData.get("socCryptoExperience");
      const socCryptoValue = formData.get("socCryptoValue");
      const socIntentionToSell = formData.get("socIntentionToSell");

      const complianceRequest: ComplianceRequest = {};

      const sowFiles = formData.getAll("sowFiles");
      const socFiles = formData.getAll("socFiles");

      if (sowFiles.length > 0) {
        complianceRequest.sowFiles = sowFiles;
      }

      if (socFiles.length > 0) {
        complianceRequest.socFiles = socFiles;
      }

      if (sowAnnualIncome && +sowAnnualIncome > 0) {
        complianceRequest.sowAnnualIncome = +sowAnnualIncome;
      }

      if (sowEmploymentStatus) {
        complianceRequest.sowEmploymentStatus = sowEmploymentStatus;
      }

      if (sowEstimatedNetWorth && +sowEstimatedNetWorth > 0) {
        complianceRequest.sowEstimatedNetWorth = +sowEstimatedNetWorth;
      }

      if (sowSourceOfNetWorth) {
        complianceRequest.sowSourceOfNetWorth = `${sowSourceOfNetWorth}`;
      }

      if (socCryptoExperience) {
        complianceRequest.socCryptoExperience = `${socCryptoExperience}`;
      }

      if (socCryptoValue && +socCryptoValue > 0) {
        complianceRequest.socCryptoValue = +socCryptoValue;
      }

      if (socIntentionToSell) {
        complianceRequest.socIntentionToSell = `${socIntentionToSell}`;
      }

      if (complianceTokens.length > 0) {
        const amount = formData.getAll("tokenAmount");
        const tokens = complianceTokens.map((token, i) => ({
          id: token.tokenId,
          amount: +amount[i],
        }));

        formData.append("complianceTokens", JSON.stringify(tokens));
      }

      formData.append("userId", `${userId}`);
      formData.append("userLimit", JSON.stringify(userLimit));

      sofComment && formData.append("sofComment", sofComment);
      socComment && formData.append("socComment", socComment);

      Object.keys(complianceRequest).length > 0 &&
        formData.append("complianceRequest", JSON.stringify(complianceRequest));

      createComplianceRecordWithRequest(formData)
        .unwrap()
        .then(() => {
          toast.success("Compliance Record successfully created");
          setComplianceDocuments([]);
          setComplianceTokens([]);
          handleClose();
        })
        .catch((e) => {
          toast.error(JSON.stringify(e?.data?.message));
        });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>

      <Dialog open={open} onClose={handleClose} sx={{ mt: 5 }}>
        <Box component={"form"} onSubmit={handleSubmitWithRequest} ref={form}>
          <DialogTitle variant="h5">Create compliance record</DialogTitle>

          <Divider />

          <DialogContent>
            <Typography variant="h6">Source of Funds: </Typography>

            <FormControl fullWidth sx={{ mt: 2 }} required>
              <InputLabel id="sof-type-select-label">SoF Limit Type</InputLabel>
              <Select
                name="sofLimitType"
                labelId="sof-type-select-label"
                id="sof-type-select"
                value={sofLimitType ?? ""}
                label="SoF Limit Type"
                onChange={handleSelectChange}
              >
                {userLimitTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              margin="dense"
              id="sofOrderLimit"
              label="SoF Order Limit"
              type="number"
              fullWidth
              variant="standard"
              value={sofOrderLimit}
              onChange={(e) => setSofOrderLimit(+e.target.value)}
            />

            <TextField
              required
              margin="dense"
              id="sofTradingLimit"
              label="SoF Trading Limit"
              type="number"
              fullWidth
              variant="standard"
              value={sofTradingLimit}
              onChange={(e) => setSofTradingLimit(+e.target.value)}
            />

            <TextField
              margin="dense"
              id="sofComment"
              label="SoF comment"
              type="text"
              fullWidth
              variant="standard"
              value={sofComment}
              onChange={(e) => setSofComment(e.target.value)}
            />

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Typography variant="h6">Source of Crypto: </Typography>

            <FormControl fullWidth sx={{ mt: 2 }} required>
              <InputLabel id="soc-type-select-label">SoC Limit Type</InputLabel>
              <Select
                name="socLimitType"
                labelId="soc-type-select-label"
                id="soc-type-select"
                value={socLimitType ?? ""}
                label="SoC Limit Type"
                onChange={handleSelectChange}
              >
                {userLimitTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              margin="dense"
              id="socOrderLimit"
              label="SoC Order Limit"
              type="number"
              fullWidth
              variant="standard"
              value={socOrderLimit}
              onChange={(e) => setSocOrderLimit(+e.target.value)}
            />

            <TextField
              required
              margin="dense"
              id="socTradingLimit"
              label="SoC Trading Limit"
              type="number"
              fullWidth
              variant="standard"
              value={socTradingLimit}
              onChange={(e) => setSocTradingLimit(+e.target.value)}
            />

            <TextField
              margin="dense"
              id="socComment"
              label="SoC comment"
              type="text"
              fullWidth
              variant="standard"
              value={socComment}
              onChange={(e) => setSocComment(e.target.value)}
            />

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Typography>
              <b>Compliance documents:</b>
            </Typography>

            <Box>
              {complianceDocuments.map((doc) => (
                <Fragment key={doc.id}>
                  <ComplianceDocument
                    document={doc}
                    setDocuments={setComplianceDocuments}
                  />
                </Fragment>
              ))}
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() =>
                  setComplianceDocuments((prevState) => [
                    ...prevState,
                    { id: Date.now().toString() },
                  ])
                }
              >
                Add document
              </Button>
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Box>
              <Typography>
                <b>Compliance tokens:</b>
              </Typography>

              {complianceTokens.map((token) => (
                <Fragment key={token.id}>
                  <ComplianceToken
                    currentToken={token}
                    setComplianceTokens={setComplianceTokens}
                  />
                </Fragment>
              ))}

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() =>
                  setComplianceTokens((prevState) => [
                    ...prevState,
                    { id: Date.now().toString(), tokenId: 0 },
                  ])
                }
              >
                Add token
              </Button>
            </Box>

            {withRequest && (
              <ComplianceRequestComponent
                sowEmploymentStatus={sowEmploymentStatus}
                setSowEmploymentStatus={setSowEmploymentStatus}
              />
            )}
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
