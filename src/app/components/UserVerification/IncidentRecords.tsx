import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Typography from "@mui/material/Typography/Typography";
import { IncidentRecordsType } from "@src/types/userVerificationTypes";

type IncidentRecordsProps = {
  data: IncidentRecordsType[];
};

export default function IncidentRecords({ data }: IncidentRecordsProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        p: 2,
      }}
      elevation={3}
    >
      <Typography variant="h6">Incident Records:</Typography>

      <Divider sx={{ mb: 2 }} />

      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table sx={{ minWidth: 650 }} aria-label="incident records table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Reported By</TableCell>
                <TableCell align="right">Incident Type</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Risk Rating</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.admin.email}</TableCell>
                  <TableCell align="right">{row.incidentType}</TableCell>
                  <TableCell align="right">{row.department}</TableCell>
                  <TableCell align="right">{row.riskRating}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No incident records</p>
      )}
    </Paper>
  );
}
