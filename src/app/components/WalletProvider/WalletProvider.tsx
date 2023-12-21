"use client";

import CreateWalletProviderForm from "@src/app/components/CreateWalletProviderForm/CreateWalletProviderForm";

type WalletProviderProps = {
  id: number;
};

export default function WalletProvider({ id }: WalletProviderProps) {
  return (
    <>
      <CreateWalletProviderForm id={id} isEdit />
    </>
  );
}
