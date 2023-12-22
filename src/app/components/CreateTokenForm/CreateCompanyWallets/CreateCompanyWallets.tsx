import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CreateCompanyWalletItem from "@src/app/components/CreateTokenForm/CreateCompanyWallets/CreateCompanyWalletItem/CreateCompanyWalletItem";
import { useGetAllNetworksQuery } from "@src/lib/redux/services/adminApi";

type CreateCompanyWalletsProps = {
  walletsCount: number;
  setWalletsCount: Dispatch<SetStateAction<number>>;
};

export default function CreateCompanyWallets({
  walletsCount,
  setWalletsCount,
}: CreateCompanyWalletsProps) {
  const { data: networksData } = useGetAllNetworksQuery();

  return (
    <>
      <Grid item xs={12}>
        <Typography>Company wallets:</Typography>
      </Grid>

      {[...Array(walletsCount).keys()].map((value, i, array) => (
        <CreateCompanyWalletItem
          key={value}
          isLastIndex={array.length - 1 !== i}
          value={value}
          networksData={networksData}
        />
      ))}

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button
          sx={{ mr: 2 }}
          color="secondary"
          variant={"contained"}
          onClick={() => setWalletsCount((prevState) => prevState + 1)}
        >
          Add more wallets
        </Button>

        {walletsCount > 1 && (
          <Button
            color="error"
            variant={"contained"}
            onClick={() =>
              setWalletsCount((prevState) =>
                prevState !== 1 ? prevState - 1 : 1,
              )
            }
          >
            Remove last wallet
          </Button>
        )}
      </Grid>
    </>
  );
}
