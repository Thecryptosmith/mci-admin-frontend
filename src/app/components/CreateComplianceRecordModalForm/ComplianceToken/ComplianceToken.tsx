import * as React from "react";

import Box from "@mui/material/Box";
import TokenSearchSelectInput from "@src/app/components/TokenSearchSelectInput/TokenSearchSelectInput";

export default function ComplianceToken() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 2,
        width: "100%",
      }}
    >
      <TokenSearchSelectInput />
    </Box>
  );
}
