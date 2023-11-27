import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import CustomAlert from "@src/app/components/CustomAlert/CustomAlert";
import { DepartmentTypeEnum } from "@src/common/emuns/DepartmentTypeEnum";
import { IncidentTypeEnum } from "@src/common/emuns/IncidentTypeEnum";
import { RiskRatingEnum } from "@src/common/emuns/RiskRatingEnum";
import { useErrorMessage } from "@src/common/hooks/useErrorMessage";
import { useCreateIncidentRecordMutation } from "@src/lib/redux/services/adminApi";
import { CreateIncidentRecordReqPayload } from "@src/types/createIncidentRecordReqPayload";

type CreateIncidentProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
};

export default function CreateIncident({
  open,
  setOpen,
  userId,
}: CreateIncidentProps) {
  const [createIncidentRecord, { isLoading, isSuccess, error, isError }] =
    useCreateIncidentRecordMutation();

  const { errorMessage } = useErrorMessage(error);

  const [incidentType, setIncidentType] = useState<IncidentTypeEnum | string>(
    "",
  );
  const [department, setDepartment] = useState<DepartmentTypeEnum | string>("");
  const [riskRating, setRiskRating] = useState<RiskRatingEnum | string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!incidentType || !department || !riskRating || !description) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [department, description, incidentType, riskRating]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }

    if (isError) {
      setIsAlertOpen(true);
    }
  }, [isSuccess, isError]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const payload = {
      userId: +userId,
      incidentType,
      department,
      riskRating,
      description,
    } as CreateIncidentRecordReqPayload;

    await createIncidentRecord(payload);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Incident</DialogTitle>

        <Divider />

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DialogContentText>
            Fill the form and submit to create incident
          </DialogContentText>

          <FormControl fullWidth>
            <InputLabel id="incident-type-select-label">
              Incident Type
            </InputLabel>
            <Select
              labelId="incident-type-select-label"
              id="incident-type-select"
              value={incidentType}
              label="Incident Type"
              onChange={(e) =>
                setIncidentType(e.target.value as IncidentTypeEnum)
              }
            >
              {Object.values(IncidentTypeEnum).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              value={department}
              label="Incident Type"
              onChange={(e) =>
                setDepartment(e.target.value as DepartmentTypeEnum)
              }
            >
              {Object.values(DepartmentTypeEnum).map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="risk-rating-select-label">Risk Rating</InputLabel>
            <Select
              labelId="risk-rating-select-label"
              id="risk-rating-select"
              value={riskRating}
              label="Incident Type"
              onChange={(e) => setRiskRating(e.target.value as RiskRatingEnum)}
            >
              {Object.values(RiskRatingEnum).map((riskRating) => (
                <MenuItem key={riskRating} value={riskRating}>
                  {riskRating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            style={{ padding: "10px" }}
            minRows={3}
            placeholder="Description (max. 256 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant={"contained"}
            onClick={handleSubmit}
            disabled={isSubmitDisabled || isLoading}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {isError && isAlertOpen && (
        <CustomAlert
          severity="error"
          isOpen={isAlertOpen}
          message={errorMessage}
        />
      )}
    </>
  );
}
