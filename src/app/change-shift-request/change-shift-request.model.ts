export class ChangeShiftRequest {
  NewShift: any;
  RequestId: number;
  EmployeeShiftDate: string;
  Remarks: string;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}