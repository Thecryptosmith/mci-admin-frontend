export type GetAllVerificationRequestsQueryParams = {
  limit?: number;
  offset?: number;
  statuses?: string[];
  orderField?: string;
  orderDirection?: "ASC" | "DESC";
};
