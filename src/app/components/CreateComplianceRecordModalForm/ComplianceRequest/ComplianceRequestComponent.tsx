import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider/Divider";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { EmploymentStatus } from "@src/common/emuns/EmploymentStatusEnum";

const userEmploymentStatuses = Object.values(EmploymentStatus);

type ComplianceRequestProps = {
  sowEmploymentStatus: EmploymentStatus | undefined;
  setSowEmploymentStatus: Dispatch<
    SetStateAction<EmploymentStatus | undefined>
  >;
};

export default function ComplianceRequestComponent({
  sowEmploymentStatus,
  setSowEmploymentStatus,
}: ComplianceRequestProps) {
  return (
    <>
      <Divider sx={{ mt: 2, mb: 2 }} />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant={"h6"}>User compliance data:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            margin="dense"
            name="sowAnnualIncome"
            id="sowAnnualIncome"
            label="SoW Annual Income"
            type="number"
            fullWidth
            variant="standard"
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="sow-employment-status-select-label">
              SoW Employment Status
            </InputLabel>
            <Select
              name="sowEmploymentStatus"
              labelId="sow-employment-status-select-label"
              id="sow-employment-status-select"
              value={sowEmploymentStatus ?? ""}
              label="SoW Employment Status"
              onChange={(e) =>
                setSowEmploymentStatus(e.target.value as EmploymentStatus)
              }
            >
              {userEmploymentStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            name="sowEstimatedNetWorth"
            id="sowEstimatedNetWorth"
            label="SoW Estimated Net Worth"
            type="number"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            name="sowSourceOfNetWorth"
            id="sowSourceOfNetWorth"
            label="SoW Source Of Net Worth"
            type="text"
            fullWidth
            variant="standard"
          />

          <InputLabel htmlFor="sowFiles" sx={{ mt: 2 }}>
            SoW Files:
          </InputLabel>
          <input name="sowFiles" id="sowFiles" type="file" multiple />

          <Divider sx={{ mt: 2, mb: 2 }} />

          <TextField
            margin="dense"
            name="socCryptoExperience"
            id="socCryptoExperience"
            label="SoC Crypto Experience"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            name="socCryptoValue"
            id="socCryptoValue"
            label="SoC Crypto Value"
            type="number"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            name="socIntentionToSell"
            id="socIntentionToSell"
            label="SoC Intention To Sell"
            type="text"
            fullWidth
            variant="standard"
          />

          <InputLabel htmlFor="socFiles" sx={{ mt: 2 }}>
            SoC Files:
          </InputLabel>
          <input name="socFiles" id="socFiles" type="file" multiple />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
