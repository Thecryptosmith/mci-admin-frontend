import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import { PriceData } from "@src/types/PriceData";

type PriceInfoProps = {
  priceData: PriceData;
};

export default function PriceInfo({ priceData }: PriceInfoProps) {
  return (
    <Paper sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="body1">
        <b>Ratio: </b>
        {priceData.ratio}
      </Typography>
      <Typography variant="body1">
        <b>Fee: </b>
        {priceData.fee}
      </Typography>
      <Typography variant="body1">
        <b>Order value: </b>
        {priceData.orderValue}
      </Typography>
      <Typography variant="body1">
        <b>Currency: </b>
        {priceData.currencyCode}
      </Typography>
    </Paper>
  );
}
