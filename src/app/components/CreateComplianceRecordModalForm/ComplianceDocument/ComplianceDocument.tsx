import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select/Select";
import { ComplianceDocumentTypeEnum } from "@src/common/emuns/ComplianceDocumentTypeEnum";

const documentTypes = Object.values(ComplianceDocumentTypeEnum);

type ComplianceDocumentProps = {
  document: { id: string };
  setDocuments: Dispatch<SetStateAction<{ id: string }[]>>;
};

export default function ComplianceDocument({
  document,
  setDocuments,
}: ComplianceDocumentProps) {
  const [documentType, setDocumentType] =
    useState<ComplianceDocumentTypeEnum>();

  const handleSelectChange = (e: SelectChangeEvent) => {
    setDocumentType(e.target.value as ComplianceDocumentTypeEnum);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2,
          width: "100%",
        }}
      >
        <FormControl sx={{ width: "250px" }} required>
          <InputLabel id="document-type-select-label">Document Type</InputLabel>
          <Select
            name="documentTypes"
            labelId="documen-type-select-label"
            id="documen-type-select"
            value={documentType ?? ""}
            label="Document Type"
            onChange={handleSelectChange}
          >
            {documentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" name="complianceDocuments" required />

        <DeleteIcon
          sx={{ cursor: "pointer" }}
          color="error"
          onClick={() =>
            setDocuments((prevState) =>
              prevState.filter((doc) => doc.id !== document.id),
            )
          }
        />
      </Box>
    </>
  );
}
