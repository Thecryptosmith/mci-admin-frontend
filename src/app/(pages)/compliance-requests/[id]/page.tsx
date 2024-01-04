"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useParams } from "next/navigation";

import ImageIcon from "@mui/icons-material/Image";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography";
import ComplianceRecords from "@src/app/components/ComplianceRecords/ComplianceRecords";
import CreateComplianceRecordModalForm from "@src/app/components/CreateComplianceRecordModalForm/CreateComplianceRecordModalForm";
import { UserVerificationRequestStatusEnum } from "@src/common/emuns/UserVerificationRequestStatusEnum";
import {
  useChangeComplianceRequestStatusMutation,
  useGetComplianceRequestQuery,
} from "@src/lib/redux/services/adminApi";

export default function ComplianceRequestPage() {
  const currentAdminEmail = localStorage.getItem("email");
  const { id } = useParams();

  const { data } = useGetComplianceRequestQuery(+id);

  const [changeComplianceRequestStatus] =
    useChangeComplianceRequestStatusMutation();

  useEffect(() => {
    if (data && data.status === UserVerificationRequestStatusEnum.PENDING) {
      changeComplianceRequestStatus({ id: +id });
    }
  }, [changeComplianceRequestStatus, data, id]);

  const handleReject = () => {
    changeComplianceRequestStatus({
      id: +id,
      status: UserVerificationRequestStatusEnum.UNAPPROVED,
    })
      .unwrap()
      .then(() => {
        toast.success("Compliance request successfully rejected");
      })
      .catch((e) => {
        toast.error(JSON.stringify(e?.data?.message));
      });
  };

  return (
    <>
      {data && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <ComplianceRecords data={data.user.complianceRecords} hideRequest />

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography>
              <b>Request Created At: </b>
              {new Date(data.createdAt).toLocaleString()}
            </Typography>

            <Typography>
              <b>Status: </b>
              {data.status}
            </Typography>

            <Typography>
              <b>Reviewing by: </b>
              {data?.admin?.email ?? ""}
            </Typography>

            <Divider sx={{ mt: 1, mb: 1 }} />

            <Box sx={{ display: "flex" }}>
              <Typography>
                <b>User email: </b>
                {data.user.email}
              </Typography>

              <Link
                href={`/users/${data.user.id}`}
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#1976d2",
                }}
              >
                <OpenInNew />
              </Link>
            </Box>

            <Typography>
              <b>User timezone: </b>
              {data.user.timezone}
            </Typography>
            <Typography>
              <b>User currency code: </b>
              {data.user.currencyCode}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant={"h6"}>Source of wealth</Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              <b>Annual Income: </b>
              {data.sowAnnualIncome}
            </Typography>
            <Typography>
              <b>Employment Status: </b>
              {data.sowEmploymentStatus}
            </Typography>
            <Typography>
              <b>Estimated Net Worth: </b>
              {data.sowEstimatedNetWorth}
            </Typography>
            <Typography>
              <b>Source Of Net Worth: </b>
              {data.sowSourceOfNetWorth}
            </Typography>

            <List>
              {data.sowFiles.map((file) => (
                <ListItem key={file.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Image" sx={{ mr: 2 }} />

                  <Link href={file.key} target="_blank">
                    <Button variant="outlined">View</Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant={"h6"}>Source of crypto</Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              <b>Crypto Experience: </b>
              {data.socCryptoExperience}
            </Typography>
            <Typography>
              <b>Crypto Value: </b>
              {data.socCryptoValue}
            </Typography>
            <Typography>
              <b>Intention To Sell: </b>
              {data.socIntentionToSell}
            </Typography>

            <List>
              {data.socFiles.map((file) => (
                <ListItem key={file.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Image" sx={{ mr: 2 }} />

                  <Link href={file.key} target="_blank">
                    <Button variant="outlined">View</Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>

          {data.status === UserVerificationRequestStatusEnum.REVIEWING &&
            data.admin &&
            data.admin.email === currentAdminEmail && (
              <>
                <CreateComplianceRecordModalForm
                  userId={data.user.id}
                  buttonTitle={"Create compliance record and approve request"}
                  userVerificationRequestId={+id}
                />

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
                  Reject request
                </Button>
              </>
            )}
        </Box>
      )}
    </>
  );
}
