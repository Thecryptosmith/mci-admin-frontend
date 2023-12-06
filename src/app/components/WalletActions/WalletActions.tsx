import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";
import { UserWalletStatusEnum } from "@src/common/emuns/UserWalletStatusEnum";
import { useChangeUserWalletStatusMutation } from "@src/lib/redux/services/adminApi";

type WalletActionsProps = {
  id: number;
  status: UserWalletStatusEnum;
};

export default function WalletActions({ id, status }: WalletActionsProps) {
  const [changeUserWalletStatus] = useChangeUserWalletStatusMutation();

  const handleActivateWallet = () => {
    changeUserWalletStatus({ id, status: UserWalletStatusEnum.ACTIVE });
  };

  const handleDeleteWallet = () => {
    changeUserWalletStatus({ id, status: UserWalletStatusEnum.DELETED });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant={"body1"}>Actions:</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {status !== UserWalletStatusEnum.ACTIVE && (
          <Button
            variant="contained"
            color="success"
            onClick={handleActivateWallet}
          >
            Activate
          </Button>
        )}

        {status !== UserWalletStatusEnum.DELETED && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteWallet}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
}
