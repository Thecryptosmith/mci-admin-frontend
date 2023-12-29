"use client";

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
import { useGetComplianceRequestQuery } from "@src/lib/redux/services/adminApi";

export default function ComplianceRequestPage() {
  const { id } = useParams();

  const { data } = useGetComplianceRequestQuery(+id);

  console.log(data);

  return (
    <>
      {data && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "lightgray",
              marginBottom: "10px",
            }}
          >
            Compliance records list placeholder
          </div>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography>
              <b>Request Created At: </b>
              {new Date(data.createdAt).toLocaleString()}
            </Typography>

            <Typography>
              <b>Status: </b>
              {data.status}
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

          <Button variant="contained">
            Create compliance record and approve request
          </Button>

          <Button variant="contained" color="error">
            Reject request
          </Button>
        </Box>
      )}
    </>
  );
}
