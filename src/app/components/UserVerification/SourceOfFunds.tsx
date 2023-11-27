import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { QuestionnaireType } from "@src/types/userVerificationTypes";

type SourceOfFundsProps = {
  data: QuestionnaireType;
  sourceOfFundsStatus: VerificationStatus;
  setSourceOfFundsStatus: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function SourceOfFunds({
  data,
  sourceOfFundsStatus,
  setSourceOfFundsStatus,
}: SourceOfFundsProps) {
  return (
    <CardWrapper status={sourceOfFundsStatus}>
      <Typography variant="h6">Source of Funds:</Typography>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="body1">
            <b>Employment Status:</b> {data.employmentStatus}
          </Typography>

          <Typography variant="body1">
            <b>Employer:</b> {data.employer}
          </Typography>

          <Typography variant="body1">
            <b>Income:</b> {data.income}
          </Typography>

          <Typography variant="body1">
            <b>Source of Funds (Trading):</b> {data.sourceOfFunds}
          </Typography>

          <UserVerificationStatus status={sourceOfFundsStatus} />
        </div>

        <ActionForm
          status={sourceOfFundsStatus}
          callback={setSourceOfFundsStatus}
        />
      </Box>
    </CardWrapper>
  );
}
