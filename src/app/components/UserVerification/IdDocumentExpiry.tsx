import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { UserIdDocumentType } from "@src/types/userVerificationTypes";

type IdDocumentExpiryProps = {
  data: UserIdDocumentType;
  idDocumentExpiry: VerificationStatus;
  setIdDocumentExpiry: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function IdDocumentExpiry({
  data,
  idDocumentExpiry,
  setIdDocumentExpiry,
}: IdDocumentExpiryProps) {
  return (
    <CardWrapper status={idDocumentExpiry}>
      <Typography variant="h6">User ID Document Expiry Date:</Typography>

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
            <b>ID Expiry Date:</b> {data.idExpiry}
          </Typography>

          <UserVerificationStatus status={idDocumentExpiry} />
        </div>

        <ActionForm status={idDocumentExpiry} callback={setIdDocumentExpiry} />
      </Box>
    </CardWrapper>
  );
}
