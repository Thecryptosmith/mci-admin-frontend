export type GetUsersRes = {
  users: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
  }[];
  count: number;
};
