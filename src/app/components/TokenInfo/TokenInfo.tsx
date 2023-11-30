import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import { ReceivingToken, SendingToken } from "@src/types/orderTypes";

type TokenInfoProps = {
  title: string;
  tokenData: SendingToken | ReceivingToken;
};

export default function TokenInfo({ title, tokenData }: TokenInfoProps) {
  return (
    <Paper sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6">{title}:</Typography>

      <Typography variant="body1">
        <b>ID: </b>
        {tokenData.id}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1">
          <b>Name: </b>
          {`${tokenData.name} (${tokenData.symbol})`}
        </Typography>
        <img src={tokenData.logo} width={32} height={32} alt="token logo" />
      </Box>
      <Typography variant="body1">
        <b>Amount: </b>
        {tokenData.amount}
      </Typography>
    </Paper>
  );
}
