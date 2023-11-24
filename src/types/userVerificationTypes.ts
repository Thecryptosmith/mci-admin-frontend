import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";

export type FileType = {
  id: number;
  key: string;
};

export type UserVerificationType = {
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

export type PersonalInformationType = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryOfResidence: string;
  nationality: string;
  areaCode: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  postCode: string;
};

export type UserIdDocumentType = {
  id: number;
  idExpiry: string;
  idNumber: string | null;
  idType: string | null;
  idNationality: string | null;
  idFirstName: string | null;
  idLastName: string | null;
  idDob: string | null;
  files: FileType[];
};

export type SelfieImageType = {
  id: number;
  key: string;
};

export type UserProofOfAddress = {
  id: number;
  dateOfIssue: string;
  issuingCompany: string | null;
  files: FileType[];
};

export type QuestionnaireType = {
  id: number;
  employmentStatus: string;
  employer: string;
  income: string;
  sourceOfFunds: string;
  expectedTradingVolume: string;
  tradingExperience: string;
  reasonsForInvestment: string;
};

export type IncidentRecordsType = {
  id: number;
  incidentType: string;
  department: string;
  riskRating: string;
  status: string;
  description: string;
  admin: {
    id: number;
    email: string;
  };
};

export type GetUserForVerificationRes = {
  id: number;
  email: string;
  status: string;
  timezone: string;
  currencyCode: string;
  userVerification: UserVerificationType;
  personalInformation: PersonalInformationType;
  userIdDocument: UserIdDocumentType;
  selfieImage: SelfieImageType;
  userProofOfAddress: UserProofOfAddress;
  questionnaire: QuestionnaireType;
  incidentRecords: IncidentRecordsType[];
};
