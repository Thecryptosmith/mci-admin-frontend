export type Network = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
};

export type GetNetworksListRes = {
  networks: Network[];
};
