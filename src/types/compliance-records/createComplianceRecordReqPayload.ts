import { UserLimit } from "@src/types/compliance-records/userLimit";

export type CreateComplianceRecordReqPayload = {
  userLimit: UserLimit;
  userId: number;
  userVerificationRequestId?: number;
  sofComment?: string;
  socComment?: string;
};
