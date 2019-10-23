export class WorkinDayOffRequest {
  Shift: any;
  RequestId: number;
  EmployeeShiftDate: string;
  SignIn: string;
  SignOut: string;
  Remarks: string;
  ExtendNextDay = false;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
