import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import ActionForm from "@src/app/components/UserVerification/ActionForm";
import CardWrapper from "@src/app/components/UserVerification/CardWrapper";
import UserVerificationStatus from "@src/app/components/UserVerification/UserVerificationStatus";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";
import { UserProofOfAddress } from "@src/types/userVerificationTypes";

type ProofOfAddressProps = {
  data: UserProofOfAddress;
  proofOfAddress: VerificationStatus;
  setProofOfAddress: Dispatch<SetStateAction<VerificationStatus>>;
};

export default function ProofOfAddress({
  data,
  proofOfAddress,
  setProofOfAddress,
}: ProofOfAddressProps) {
  return (
    <CardWrapper status={proofOfAddress}>
      <Typography variant="h6">Proof of Address documents:</Typography>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <List dense={false}>
            {data.files.map((file, index) => (
              <ListItem key={file.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`#${index + 1}`} sx={{ mr: 2 }} />

                <Link href={file.key} target="_blank">
                  <Button variant="outlined">View</Button>
                </Link>
              </ListItem>
            ))}
          </List>

          <UserVerificationStatus status={proofOfAddress} />
        </div>

        <ActionForm status={proofOfAddress} callback={setProofOfAddress} />
      </Box>
    </CardWrapper>
  );
}
