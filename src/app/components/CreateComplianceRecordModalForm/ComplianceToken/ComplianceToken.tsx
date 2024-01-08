import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import TokenSearchSelectInput from "@src/app/components/TokenSearchSelectInput/TokenSearchSelectInput";
import { ComplianceTokenType } from "@src/types/compliance-records/complianceToken";

type ComplianceTokenProps = {
  currentToken: ComplianceTokenType;
  setComplianceTokens: Dispatch<SetStateAction<ComplianceTokenType[]>>;
};

export default function ComplianceToken({
  currentToken,
  setComplianceTokens,
}: ComplianceTokenProps) {
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
      <TokenSearchSelectInput
        currentToken={currentToken}
        setTokens={setComplianceTokens}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <InputLabel htmlFor="tokenAmount">Amount *</InputLabel>

        <input
          required
          id="tokenAmount"
          name="tokenAmount"
          type="number"
          min="0"
          step="0.0000000001"
          style={{ height: "30px" }}
        />
      </Box>

      <DeleteIcon
        sx={{ cursor: "pointer" }}
        color="error"
        onClick={() =>
          setComplianceTokens((prevState) =>
            prevState.filter((token) => token.id !== currentToken.id),
          )
        }
      />
    </Box>
  );
}
