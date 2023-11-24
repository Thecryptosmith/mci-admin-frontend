import { statusColor } from "@src/common/consts/statusColor";
import { VerificationStatus } from "@src/common/emuns/VerificationStatusEnum";

type UserVerificationStatusProps = {
  status: VerificationStatus;
};

export default function UserVerificationStatus({
  status,
}: UserVerificationStatusProps) {
  return (
    <span
      style={{
        color: statusColor[status],
        display: "inline-block",
        padding: "10px",
        backgroundColor: "white",
        border: `1px solid ${statusColor[status]}`,
        borderRadius: "20px",
      }}
    >
      {status}
    </span>
  );
}
