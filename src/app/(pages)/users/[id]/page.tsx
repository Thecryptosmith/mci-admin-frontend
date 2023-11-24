"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box/Box";
import IdDocument from "@src/app/components/UserVerification/IdDocument";
import PersonalAddress from "@src/app/components/UserVerification/PersonalAddress";
import PersonalInfo from "@src/app/components/UserVerification/PersonalInfo";
import SourceOfFunds from "@src/app/components/UserVerification/SourceOfFunds";
import TradingActivity from "@src/app/components/UserVerification/TradingActivity";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { useGetUserForVerificationQuery } from "@src/lib/redux/services/adminApi";

type UserPageProps = {
  params: {
    id: number;
  };
};

export default function UserPage({ params }: UserPageProps) {
  const { data } = useGetUserForVerificationQuery(params.id);

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

  useEffect(() => {
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

  console.log({
    personalInformationStatus,
    personalAddressStatus,
    sourceOfFundsStatus,
    tradingActivityStatus,
    idDocument,
    idDocumentExpiry,
    proofOfAddress,
    proofOfAddressDate,
    selfieImage,
  });

  return (
    <>
      {data && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <PersonalInfo
            data={data}
            personalInformationStatus={personalInformationStatus}
            setPersonalInformationStatus={setPersonalInformationStatus}
          />

          <PersonalAddress
            data={data}
            personalAddressStatus={personalAddressStatus}
            setPersonalAddressStatus={setPersonalAddressStatus}
          />

          <SourceOfFunds
            data={data}
            sourceOfFundsStatus={sourceOfFundsStatus}
            setSourceOfFundsStatus={setSourceOfFundsStatus}
          />

          <TradingActivity
            data={data}
            tradingActivityStatus={tradingActivityStatus}
            setTradingActivityStatus={setTradingActivityStatus}
          />

          <IdDocument
            data={data}
            idDocument={idDocument}
            setIdDocument={setIdDocument}
          />
        </Box>
      )}
    </>
  );
}
