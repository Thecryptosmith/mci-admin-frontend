import WalletProvider from "@src/app/components/WalletProvider/WalletProvider";

type WalletProviderPageProps = {
  params: {
    id: number;
  };
};

export default function WalletProviderPage({
  params,
}: WalletProviderPageProps) {
  return (
    <>
      <WalletProvider id={params.id} />
    </>
  );
}
