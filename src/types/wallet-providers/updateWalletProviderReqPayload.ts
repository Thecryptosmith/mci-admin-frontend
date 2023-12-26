import { WalletProviderApplicationEnum } from "@src/common/emuns/WalletProviderApplicationEnum";
import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import { WalletProviderCustodyEnum } from "@src/common/emuns/WalletProviderCustodyEnum";
import { NetworkWithTokensPayload } from "@src/types/wallet-providers/network-with-tokens";

export type UpdateWalletProviderReqPayload = {
  id: number;
  name: string;
  description: string;
  url: string;
  about: string;
  overallRanking: number;
  rating: number;
  category: WalletProviderCategoryEnum;
  file: number;
  networks: NetworkWithTokensPayload[];
  custody: WalletProviderCustodyEnum;
  staking: boolean;
  application: WalletProviderApplicationEnum;
};
