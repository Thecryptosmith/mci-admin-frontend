import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";

export type UpdateUserVerificationReqPayload = {
  id: number;
  personalInformationStatus: VerificationStatus;
  personalAddressStatus: VerificationStatus;
  sourceOfFundsStatus: VerificationStatus;
  tradingActivityStatus: VerificationStatus;
  idDocument: VerificationStatus;
  idDocumentExpiry: VerificationStatus;
  proofOfAddress: VerificationStatus;
  proofOfAddressDate: VerificationStatus;
  selfieImage: VerificationStatus;
};
