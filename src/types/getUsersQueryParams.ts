import { GetUsersFilterEnum } from "@src/common/emuns/GetUsersFilterEnum";

export type GetUsersQueryParams = {
  filter: GetUsersFilterEnum;
  email?: string;
  limit: number;
  offset: number;
};
