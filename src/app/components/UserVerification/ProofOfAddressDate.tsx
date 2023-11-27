import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { UserProofOfAddress } from "@src/types/userVerificationTypes";

type ProofOfAddressDateProps = {
  data: UserProofOfAddress;
  proofOfAddressDate: VerificationStatus;
  setProofOfAddressDate: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function ProofOfAddressDate({
  data,
  proofOfAddressDate,
  setProofOfAddressDate,
}: ProofOfAddressDateProps) {
  return (
    <CardWrapper status={proofOfAddressDate}>
      <Typography variant="h6">Proof Of Address Document Date:</Typography>

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
            <b>ID Expiry Date:</b> {data.dateOfIssue}
          </Typography>

          <UserVerificationStatus status={proofOfAddressDate} />
        </div>

        <ActionForm
          status={proofOfAddressDate}
          callback={setProofOfAddressDate}
        />
      </Box>
    </CardWrapper>
  );
}
