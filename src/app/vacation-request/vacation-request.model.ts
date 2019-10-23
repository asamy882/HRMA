export class VactionRequest {
  FromDate: string;
  ToDate: string;
  Remarks: string;
  VacationDays: number;
  VacationTypeId: number;
  Balance: number;
  ExcludeWeekend = true;
  ReplacementId: number;
  ReplacementName: string;
  VacationType: any;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
