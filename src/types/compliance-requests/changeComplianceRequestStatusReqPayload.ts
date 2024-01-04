import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";

export type ChangeComplianceRequestStatusReqPayload = {
  id: number;
  status?: UserVerificationRequestStatusEnum;
};
