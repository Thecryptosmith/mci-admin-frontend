export type OrderLog = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  errorMessage: string | null;
  errorBody: string | null;
};

export type GetOrderLogsRes = {
  orderLogs: OrderLog[];
};
