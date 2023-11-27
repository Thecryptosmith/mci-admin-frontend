import { DepartmentTypeEnum } from "@src/common/emuns/DepartmentTypeEnum";
import { IncidentTypeEnum } from "@src/common/emuns/IncidentTypeEnum";
import { RiskRatingEnum } from "@src/common/emuns/RiskRatingEnum";

export type CreateIncidentRecordReqPayload = {
  userId: number;
  incidentType: IncidentTypeEnum;
  department: DepartmentTypeEnum;
  riskRating: RiskRatingEnum;
  description: string;
};
