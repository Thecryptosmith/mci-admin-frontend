export type NetworkWithTokens = {
  id: string;
  data: { id: number; tokensInfo: { id: number; yield: number }[] | null };
};
