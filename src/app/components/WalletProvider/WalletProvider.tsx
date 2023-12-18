"use client";

type WalletProviderProps = {
  id: number;
};

export default function WalletProvider({ id }: WalletProviderProps) {
  return (
    <>
      <div>WalletProviderID: {id}</div>
    </>
  );
}
