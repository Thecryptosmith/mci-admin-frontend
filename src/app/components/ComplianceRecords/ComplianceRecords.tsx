import Link from "next/link";

import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Typography from "@mui/material/Typography/Typography";
import { ComplianceRecord } from "@src/types/compliance-records/complianceRecord";

type ComplianceRecordsProps = {
  data: ComplianceRecord[];
  hideRequest?: boolean;
};

export default function ComplianceRecords({
  data,
  hideRequest = false,
}: ComplianceRecordsProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        p: 2,
      }}
      elevation={3}
    >
      <Typography variant="h6">Compliance Records:</Typography>

      <Divider sx={{ mb: 2 }} />

      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table sx={{ minWidth: 650 }} aria-label="compliance records table">
            <TableHead>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Reported By</TableCell>
                {!hideRequest && (
                  <TableCell align="right">Compliance request</TableCell>
                )}
                <TableCell align="right">SoF Limit Type</TableCell>
                <TableCell align="right">SoF Order Limit</TableCell>
                <TableCell align="right">SoF Trading Limit</TableCell>
                <TableCell align="right">SoF comment</TableCell>
                <TableCell align="right">SoC Limit Type</TableCell>
                <TableCell align="right">SoC Order Limit</TableCell>
                <TableCell align="right">SoC Trading Limit</TableCell>
                <TableCell align="right">SoC comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record) => (
                <TableRow
                  key={record.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="record">
                    {new Date(record.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{record.admin.email}</TableCell>
                  {!hideRequest && (
                    <TableCell align="right">
                      <Link
                        href={`/compliance-requests/${record.userVerificationRequest.id}`}
                        target="_blank"
                      >
                        <Button variant="outlined">View</Button>
                      </Link>
                    </TableCell>
                  )}
                  <TableCell align="right">
                    {record.userLimit.sofLimitType}
                  </TableCell>
                  <TableCell align="right">
                    {record.userLimit.sofOrderLimit}
                  </TableCell>
                  <TableCell align="right">
                    {record.userLimit.sofTradingLimit}
                  </TableCell>
                  <TableCell
                    align="right"
                    title={record.sofComment ?? ""}
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: 150,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {record.sofComment ?? ""}
                  </TableCell>
                  <TableCell align="right">
                    {record.userLimit.socLimitType}
                  </TableCell>
                  <TableCell align="right">
                    {record.userLimit.socOrderLimit}
                  </TableCell>
                  <TableCell align="right">
                    {record.userLimit.socTradingLimit}
                  </TableCell>
                  <TableCell
                    align="right"
                    title={record.socComment ?? ""}
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: 150,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {record.socComment ?? ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No compliance records</p>
      )}
    </Paper>
  );
}
