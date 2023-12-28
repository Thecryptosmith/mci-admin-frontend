import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";

export type VerificationRequestsItem = {
  id: number;
  status: UserVerificationRequestStatusEnum;
  createdAt: string;
  sowEstimatedNetWorth: number;
  socCryptoValue: number;
  user: {
    id: number;
    email: string;
  };
  admin: {
    id: number;
    email: string;
  } | null;
  sowCompleted: boolean;
  socCompleted: boolean;
};

export type GetAllVerificationRequestsRes = {
  requests: VerificationRequestsItem[];
  count: number;
};
