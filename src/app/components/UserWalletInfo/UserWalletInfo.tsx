import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import { UserWalletInfo } from "@src/types/orderTypes";

type UserWalletInfoProps = {
  userWalletInfo: UserWalletInfo;
};

export default function UserWalletInfo({
  userWalletInfo,
}: UserWalletInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", width: "100%", p: 2 }}
    >
      <Typography variant="h5">User wallet info:</Typography>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1">
          <b>Name: </b>
          {`${userWalletInfo.cryptocurrencyName} (${userWalletInfo.cryptocurrencySymbol})`}
        </Typography>
        <img
          src={userWalletInfo.cryptocurrencyLogo}
          width={32}
          height={32}
          alt="token logo"
        />
      </Box>

      <Typography variant="body1">
        <b>Wallet Address: </b>
        {userWalletInfo.walletAddress}
      </Typography>
      <Typography variant="body1">
        <b>Receiving Wallet: </b>
        {userWalletInfo.receivingWallet}
      </Typography>
      <Typography variant="body1">
        <b>Wallet memo: </b>
        {userWalletInfo.walletMemo}
      </Typography>
    </Paper>
  );
}
