import { Dispatch, SetStateAction } from "react";

import { RadioGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Radio from "@mui/material/Radio/Radio";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";

type ActionFormProps = {
  status: VerificationStatus;
  callback: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function ActionForm({ status, callback }: ActionFormProps) {
  return (
    <FormControl>
      <FormLabel id="status-action">Status action</FormLabel>
      <RadioGroup
        name="status-action"
        onChange={(event, value) => callback(value as VerificationStatus)}
      >
        <FormControlLabel
          value="approved"
          control={<Radio />}
          label="Approved"
          checked={status === VerificationStatus.APPROVED}
        />
        <FormControlLabel
          value="unapproved"
          control={<Radio />}
          label="Unapproved"
          checked={status === VerificationStatus.UNAPPROVED}
        />
      </RadioGroup>
    </FormControl>
  );
}
