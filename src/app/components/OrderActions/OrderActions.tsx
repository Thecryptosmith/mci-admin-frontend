import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderStatusForActionEnum } from "@src/common/emuns/OrderStatusForActionEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import {
  useProcessOrderMutation,
  useSendChangeOrderStatusNotificationMutation,
} from "@src/lib/redux/services/adminApi";
import { ProcessOrderActionEnum } from "@src/types/processOrderActionEnum";

type OrderActionsProps = {
  id: number;
  type: OrderTypeEnum;
  orderStatus: OrderStatusEnum;
};

export default function OrderActions({
  id,
  type,
  orderStatus,
}: OrderActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isExecute, setIsExecute] = useState<boolean>(false);

  const isActionAllowed = (
    Object.values(OrderStatusForActionEnum) as string[]
  ).includes(orderStatus);

  const [processOrder] = useProcessOrderMutation();
  const [sendChangeOrderStatusNotification] =
    useSendChangeOrderStatusNotificationMutation();

  useEffect(() => {
    if (orderStatus !== OrderStatusEnum.PENDING_ADMIN_APPROVAL) {
      sendChangeOrderStatusNotification({
        id,
        newStatus: orderStatus,
      });
    }
  }, [orderStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExecute = async () => {
    await processOrder({
      id,
      type,
      action: ProcessOrderActionEnum.EXECUTE,
    });

    handleClose();
  };
  const handleCancel = async () => {
    await processOrder({
      id,
      type,
      action: ProcessOrderActionEnum.CANCEL,
    });

    handleClose();
  };

  const handleExecuteOpen = () => {
    setOpen(true);
    setIsExecute(true);
  };

  const handleCancelOpen = () => {
    setOpen(true);
    setIsExecute(false);
  };

  return (
    <>
      {isActionAllowed ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleExecuteOpen}
          >
            Execute
          </Button>
          <Button variant="contained" color="error" onClick={handleCancelOpen}>
            Cancel
          </Button>
        </Box>
      ) : null}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Are you sure?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={isExecute ? handleExecute : handleCancel}
            autoFocus
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
