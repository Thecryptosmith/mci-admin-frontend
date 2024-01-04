import { UserLimit } from "@src/types/compliance-records/userLimit";
import { ComplianceRequest } from "@src/types/compliance-requests/complianceRequest";

export type CreateComplianceRecordWithRequestReqPayload = {
  userLimit: UserLimit;
  userId: number;
  sofComment?: string;
  socComment?: string;
  complianceRequest: ComplianceRequest;
};
