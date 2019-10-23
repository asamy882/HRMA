export class OvertimeRequest {
  RequestId: number;
  OvertimeDate: string;
  FromTime: string;
  ToTime: string;
  Remarks: string;
  ExtendNextDay = false;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
