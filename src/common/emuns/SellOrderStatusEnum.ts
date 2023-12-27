export enum SellOrderStatusEnum {
  START_TRANSACTION = "start_transaction",
  PENDING_USER_PAYMENT = "pending_user_payment",
  PENDING_ADMIN_APPROVAL = "pending_admin_approval",
  EXECUTION_SYSTEM_ORDER_TO_DEFAULT_TOKEN = "execution_system_order_to_default_token",
  EXECUTION_SYSTEM_TRANSACTION = "execution_system_transaction",
  COMPLETED = "completed",
  CANCEL = "cancel",
  EXPIRED = "expired",
}
