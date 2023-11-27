import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { PersonalInformationType } from "@src/types/userVerificationTypes";

type PersonalAddressProps = {
  data: PersonalInformationType;
  personalAddressStatus: VerificationStatus;
  setPersonalAddressStatus: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function PersonalAddress({
  data,
  personalAddressStatus,
  setPersonalAddressStatus,
}: PersonalAddressProps) {
  return (
    <CardWrapper status={personalAddressStatus}>
      <Typography variant="h6">Residential Address:</Typography>

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
            <b>Address Line 1:</b> {data.addressLine1}
          </Typography>

          <Typography variant="body1">
            <b>Address Line 2:</b> {data.addressLine2}
          </Typography>

          <Typography variant="body1">
            <b>Country:</b> {data.addressLine1}
          </Typography>

          <Typography variant="body1">
            <b>Post Code:</b> {data.postCode}
          </Typography>

          <UserVerificationStatus status={personalAddressStatus} />
        </div>

        <ActionForm
          status={personalAddressStatus}
          callback={setPersonalAddressStatus}
        />
      </Box>
    </CardWrapper>
  );
}
