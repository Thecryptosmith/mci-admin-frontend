import { UserWalletStatusEnum } from "@src/common/emuns/UserWalletStatusEnum";

type User = {
  id: number;
  email: string;
};

type BaseCryptoInfo = {
  id: number;
  logo: string;
  name: string;
  symbol: string;
};

type TokenInfo = BaseCryptoInfo;
type Network = BaseCryptoInfo;

export type UserWallet = {
  id: number;
  walletLabel: string;
  walletAddress: string;
  walletMemo: string;
  walletKey: string;
  platformType: string;
  platformName: string;
  destinationPlatform: string;
  firstUsed: string | null;
  status: UserWalletStatusEnum;
  user: User;
  tokenInfo: TokenInfo;
  network: Network;
};

export type GetUserWalletsRes = {
  userWallets: UserWallet[];

  count: number;
};
