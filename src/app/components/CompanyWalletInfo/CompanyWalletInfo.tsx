import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import { CompanyWalletInfo } from "@src/types/orderTypes";

type CompanyWalletInfoProps = {
  companyWalletInfo: CompanyWalletInfo;
};

export default function CompanyWalletInfo({
  companyWalletInfo,
}: CompanyWalletInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", width: "100%", p: 2 }}
    >
      <Typography variant="h5">Company wallet info:</Typography>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1">
          <b>Name: </b>
          {`${companyWalletInfo.cryptocurrencyName} (${companyWalletInfo.cryptocurrencySymbol})`}
        </Typography>
        <img
          src={companyWalletInfo.cryptocurrencyLogo}
          width={32}
          height={32}
          alt="token logo"
        />
      </Box>

      <Typography variant="body1">
        <b>Wallet Address: </b>
        {companyWalletInfo.walletAddress}
      </Typography>
      <Typography variant="body1">
        <b>Network: </b>
        {companyWalletInfo.network}
      </Typography>
      <Typography variant="body1">
        <b>Amount: </b>
        {companyWalletInfo.amount}
      </Typography>
    </Paper>
  );
}
