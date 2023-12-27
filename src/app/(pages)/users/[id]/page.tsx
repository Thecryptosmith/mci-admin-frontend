"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography/Typography";
import CreateIncident from "@src/app/components/CreateIncident/CreateIncident";
import CustomAlert from "@src/app/components/CustomAlert/CustomAlert";
import IdDocument from "@src/app/components/UserVerification/IdDocument";
import IdDocumentExpiry from "@src/app/components/UserVerification/IdDocumentExpiry";
import IncidentRecords from "@src/app/components/UserVerification/IncidentRecords";
import PersonalAddress from "@src/app/components/UserVerification/PersonalAddress";
import PersonalInfo from "@src/app/components/UserVerification/PersonalInfo";
import ProofOfAddress from "@src/app/components/UserVerification/ProofOfAddress";
import ProofOfAddressDate from "@src/app/components/UserVerification/ProofOfAddressDate";
import SelfieImage from "@src/app/components/UserVerification/SelfieImage";
import SourceOfFunds from "@src/app/components/UserVerification/SourceOfFunds";
import TradingActivity from "@src/app/components/UserVerification/TradingActivity";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { useErrorMessage } from "@src/common/hooks/useErrorMessage";
import {
  useGetUserForVerificationQuery,
  useUpdateUserVerificationMutation,
} from "@src/lib/redux/services/adminApi";

type UserPageProps = {
  params: {
    id: number;
  };
};

export default function UserPage({ params }: UserPageProps) {
  const { data } = useGetUserForVerificationQuery(params.id);
  const [updateUserVerification, { isLoading, isSuccess, isError, error }] =
    useUpdateUserVerificationMutation();

  const { errorMessage } = useErrorMessage(error);

  const [personalInformationStatus, setPersonalInformationStatus] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  const [personalAddressStatus, setPersonalAddressStatus] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  const [sourceOfFundsStatus, setSourceOfFundsStatus] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  const [tradingActivityStatus, setTradingActivityStatus] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  const [idDocument, setIdDocument] = useState<VerificationStatus>(
    VerificationStatus.PENDING,
  );
  const [idDocumentExpiry, setIdDocumentExpiry] = useState<VerificationStatus>(
    VerificationStatus.PENDING,
  );
  const [proofOfAddress, setProofOfAddress] = useState<VerificationStatus>(
    VerificationStatus.PENDING,
  );
  const [proofOfAddressDate, setProofOfAddressDate] =
    useState<VerificationStatus>(VerificationStatus.PENDING);
  const [selfieImage, setSelfieImage] = useState<VerificationStatus>(
    VerificationStatus.PENDING,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isCreateIncidentOpen, setIsCreateIncidentOpen] =
    useState<boolean>(false);

  const isFirstSubmitClick = useRef(true);

  useLayoutEffect(() => {
    if (data) {
      setPersonalInformationStatus(
        data.userVerification.personalInformationStatus,
      );
      setPersonalAddressStatus(data.userVerification.personalAddressStatus);
      setSourceOfFundsStatus(data.userVerification.sourceOfFundsStatus);
      setTradingActivityStatus(data.userVerification.tradingActivityStatus);
      setIdDocument(data.userVerification.idDocument);
      setIdDocumentExpiry(data.userVerification.idDocumentExpiry);
      setProofOfAddress(data.userVerification.proofOfAddress);
      setProofOfAddressDate(data.userVerification.proofOfAddressDate);
      setSelfieImage(data.userVerification.selfieImage);
    }
  }, [data]);

  useEffect(() => {
    if (
      personalInformationStatus === VerificationStatus.PENDING ||
      personalAddressStatus === VerificationStatus.PENDING ||
      sourceOfFundsStatus === VerificationStatus.PENDING ||
      tradingActivityStatus === VerificationStatus.PENDING ||
      idDocument === VerificationStatus.PENDING ||
      idDocumentExpiry === VerificationStatus.PENDING ||
      proofOfAddress === VerificationStatus.PENDING ||
      proofOfAddressDate === VerificationStatus.PENDING ||
      selfieImage === VerificationStatus.PENDING
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [
    personalInformationStatus,
    personalAddressStatus,
    sourceOfFundsStatus,
    tradingActivityStatus,
    idDocument,
    idDocumentExpiry,
    proofOfAddress,
    proofOfAddressDate,
    selfieImage,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setIsAlertOpen(true);
    }

    if (isError) {
      setIsAlertOpen(true);
    }
  }, [isSuccess, isError]);

  const handleSubmit = async () => {
    if (isFirstSubmitClick.current) {
      isFirstSubmitClick.current = false;
      handleOpenCreateIncident();

      return;
    }

    const payload = {
      id: params.id,
      personalInformationStatus,
      personalAddressStatus,
      sourceOfFundsStatus,
      tradingActivityStatus,
      idDocument,
      idDocumentExpiry,
      proofOfAddress,
      proofOfAddressDate,
      selfieImage,
    };

    await updateUserVerification(payload);
  };

  const handleOpenCreateIncident = () => {
    setIsCreateIncidentOpen(true);
  };

  return (
    <>
      <Box>
        {data && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "calc(100% - 220px)",
              paddingBottom: "70px",
            }}
          >
            <IncidentRecords data={data.incidentRecords} />

            <PersonalInfo
              data={data}
              personalInformationStatus={personalInformationStatus}
              setPersonalInformationStatus={setPersonalInformationStatus}
            />

            <SelfieImage
              data={data.selfieImage}
              selfieImage={selfieImage}
              setSelfieImage={setSelfieImage}
            />

            <PersonalAddress
              data={data.personalInformation}
              personalAddressStatus={personalAddressStatus}
              setPersonalAddressStatus={setPersonalAddressStatus}
            />

            <SourceOfFunds
              data={data.questionnaire}
              sourceOfFundsStatus={sourceOfFundsStatus}
              setSourceOfFundsStatus={setSourceOfFundsStatus}
            />

            <TradingActivity
              data={data}
              tradingActivityStatus={tradingActivityStatus}
              setTradingActivityStatus={setTradingActivityStatus}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <IdDocument
                data={data.userIdDocument}
                idDocument={idDocument}
                setIdDocument={setIdDocument}
              />

              <IdDocumentExpiry
                data={data.userIdDocument}
                idDocumentExpiry={idDocumentExpiry}
                setIdDocumentExpiry={setIdDocumentExpiry}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <ProofOfAddress
                data={data.userProofOfAddress}
                proofOfAddress={proofOfAddress}
                setProofOfAddress={setProofOfAddress}
              />

              <ProofOfAddressDate
                data={data.userProofOfAddress}
                proofOfAddressDate={proofOfAddressDate}
                setProofOfAddressDate={setProofOfAddressDate}
              />
            </Box>

            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "70px",
                bgcolor: "white",
                padding: "10px 0",
              }}
            >
              <Button
                variant={"contained"}
                sx={{ width: "100%", height: "100%" }}
                onClick={handleSubmit}
                disabled={isSubmitDisabled || isLoading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}

        <Drawer
          sx={{
            width: 220,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 220,
              boxSizing: "border-box",
              top: ["48px", "56px", "64px"],
              height: "auto",
              bottom: 0,
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <List sx={{ px: 2 }}>
            <ListItem disablePadding>
              <Typography variant="overline" sx={{ fontWeight: 500 }}>
                Actions
              </Typography>
            </ListItem>

            <ListItem>
              <Button variant={"contained"} onClick={handleOpenCreateIncident}>
                Create incident
              </Button>
            </ListItem>

            <ListItem>
              <Link href={`/orders?userId=${params.id}`} target="_blank">
                <Button variant={"outlined"}>View all orders</Button>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>

      {isCreateIncidentOpen && (
        <CreateIncident
          userId={params.id}
          open={isCreateIncidentOpen}
          setOpen={setIsCreateIncidentOpen}
        />
      )}

      {isSuccess && isAlertOpen && (
        <CustomAlert
          severity="success"
          isOpen={isAlertOpen}
          message="User verification succesfully updated"
        />
      )}

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
