import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import { BankAccount } from "@src/types/orderTypes";

type BankAccountInfoProps = {
  bankAccountInfo: BankAccount;
};

export default function BankAccountInfo({
  bankAccountInfo,
}: BankAccountInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", width: "100%", p: 2 }}
    >
      <Typography variant="h5">Bank account info:</Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body1">
        <b>Company Name: </b>
        {bankAccountInfo.companyName}
      </Typography>
      <Typography variant="body1">
        <b>Company Address: </b>
        {bankAccountInfo.companyAddress}
      </Typography>
      <Typography variant="body1">
        <b>Account Number: </b>
        {bankAccountInfo.accountNumber}
      </Typography>
      <Typography variant="body1">
        <b>Payment Reference: </b>
        {bankAccountInfo.paymentReference}
      </Typography>
      <Typography variant="body1">
        <b>Sort Code: </b>
        {bankAccountInfo.sortCode}
      </Typography>
      <Typography variant="body1">
        <b>Payment Amount: </b>
        {bankAccountInfo.paymentAmount}
      </Typography>
    </Paper>
  );
}
