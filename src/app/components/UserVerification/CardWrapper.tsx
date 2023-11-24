import { ReactNode } from "react";

import Paper from "@mui/material/Paper/Paper";
import { statusBgColor } from "@src/common/consts/statusColor";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";

type CardWrapperProps = {
  status: VerificationStatus;
  children: ReactNode;
};

export default function CardWrapper({ status, children }: CardWrapperProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        p: 2,
        backgroundColor: statusBgColor[status],
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}
