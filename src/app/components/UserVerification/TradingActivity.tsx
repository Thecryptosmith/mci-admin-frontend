import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { GetUserForVerificationRes } from "@src/types/userVerificationTypes";

type TradingActivityProps = {
  data: GetUserForVerificationRes;
  tradingActivityStatus: VerificationStatus;
  setTradingActivityStatus: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function TradingActivity({
  data,
  tradingActivityStatus,
  setTradingActivityStatus,
}: TradingActivityProps) {
  return (
    <CardWrapper status={tradingActivityStatus}>
      <Typography variant="h6">Trading Activity:</Typography>

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
            <b>{`Expected Trading Volume (${data.currencyCode}): `}</b>
            {data.questionnaire.expectedTradingVolume}
          </Typography>

          <Typography variant="body1">
            <b>Is This Your First Time Trading:</b>{" "}
            {data.questionnaire.tradingExperience}
          </Typography>

          <Typography variant="body1">
            <b>Reason For Investment:</b>{" "}
            {data.questionnaire.reasonsForInvestment}
          </Typography>

          <UserVerificationStatus status={tradingActivityStatus} />
        </div>

        <ActionForm
          status={tradingActivityStatus}
          callback={setTradingActivityStatus}
        />
      </Box>
    </CardWrapper>
  );
}
