import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditCompanyWalletItem from "@src/app/components/CreateTokenForm/EditCompanyWallets/EditCompanyWalletItem/EditCompanyWalletItem";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";
import { CompanyWalletForEditType } from "@src/types/getFullTokenInfoRes";

type EditCompanyWalletsProps = {
  companyWallets: CompanyWalletForEditType[];
  setCompanyWallets: Dispatch<SetStateAction<CompanyWalletForEditType[]>>;
};

export default function EditCompanyWallets({
  companyWallets,
  setCompanyWallets,
}: EditCompanyWalletsProps) {
  const { data: networksData } = useGetAllNetworksQuery();

  return (
    <>
      <Grid item xs={12}>
        <Typography>Company wallets:</Typography>
      </Grid>

      {companyWallets.map((wallet, index) => (
        <EditCompanyWalletItem
          key={wallet.id}
          index={index}
          wallet={wallet}
          networksData={networksData}
          setCompanyWallets={setCompanyWallets}
          isLastIndex={companyWallets.length - 1 !== index}
        />
      ))}

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button
          sx={{ mr: 2 }}
          color="secondary"
          variant={"contained"}
          onClick={() =>
            setCompanyWallets((prevState) => [
              ...prevState,
              {
                id: Date.now().toString(),
                walletAddress: "",
                name: "",
                memo: "",
                networkId: "",
                tokenExplorer: {
                  transactionExplorerLink: null,
                  walletExplorerLink: null,
                  isMemoNeeded: false,
                },
              },
            ])
          }
        >
          Add more wallets
        </Button>

        {companyWallets.length > 0 && (
          <Button
            color="error"
            variant={"contained"}
            onClick={() =>
              setCompanyWallets((prevState) => {
                const newArr = [...prevState];

                newArr.pop();

                return newArr;
              })
            }
          >
            Remove last wallet
          </Button>
        )}
      </Grid>
    </>
  );
}
