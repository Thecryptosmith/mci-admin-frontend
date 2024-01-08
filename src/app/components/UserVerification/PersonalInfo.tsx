import { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { GetUserForVerificationRes } from "@src/types/userVerificationTypes";

type PersonalInfoProps = {
  data: GetUserForVerificationRes;
  personalInformationStatus: VerificationStatus;
  setPersonalInformationStatus: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function PersonalInfo({
  data,
  personalInformationStatus,
  setPersonalInformationStatus,
}: PersonalInfoProps) {
  return (
    <CardWrapper status={personalInformationStatus}>
      <Typography variant="h6">Personal information:</Typography>

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
            <b>UserID:</b> {data.id}
          </Typography>

          <Typography variant="body1">
            <b>Email:</b> {data.email}
          </Typography>

          <Typography variant="body1">
            <b>Fist name:</b> {data.personalInformation.firstName}
          </Typography>

          <Typography variant="body1">
            <b>Last name:</b> {data.personalInformation.lastName}
          </Typography>

          <Typography variant="body1">
            <b>Date Of Birth:</b>{" "}
            {new Date(
              data.personalInformation.dateOfBirth,
            ).toLocaleDateString()}
          </Typography>

          <Typography variant="body1">
            <b>Country Of Residence:</b> {data.personalInformation.country}
          </Typography>

          <Typography variant="body1">
            <b>Nationality/Citizenship:</b>{" "}
            {data.personalInformation.nationality}
          </Typography>

          <Typography variant="body1">
            <b>Phone Number:</b>{" "}
            {`(${data.personalInformation.areaCode}) ` +
              data.personalInformation.phoneNumber}
          </Typography>

          <UserVerificationStatus status={personalInformationStatus} />
        </div>

        <ActionForm
          status={personalInformationStatus}
          callback={setPersonalInformationStatus}
        />
      </Box>
    </CardWrapper>
  );
}
