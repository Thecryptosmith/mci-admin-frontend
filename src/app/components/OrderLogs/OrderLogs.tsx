import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Typography from "@mui/material/Typography";
import { useGetOrderLogsQuery } from "@src/lib/redux/services/adminApi";

type OrderLogs = {
  id: number;
};

export default function OrderLogs({ id }: OrderLogs) {
  const { data, refetch } = useGetOrderLogsQuery(id);

  return (
    <>
      {data && data.orderLogs.length > 0 ? (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant={"h5"}>Logs:</Typography>
            <Button variant="outlined" onClick={refetch}>
              Refresh
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Error message</TableCell>
                  <TableCell align="left">Error body</TableCell>
                  <TableCell align="left">Updated at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.orderLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {log.id}
                    </TableCell>
                    <TableCell align="left">{log.title}</TableCell>
                    <TableCell align="left">
                      {log?.errorMessage ?? ""}
                    </TableCell>
                    <TableCell align="left">{log?.errorBody}</TableCell>
                    <TableCell align="left">
                      {new Date(log.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div>No logs</div>
      )}
    </>
  );
}
