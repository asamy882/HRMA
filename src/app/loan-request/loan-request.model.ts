export class LoanRequest {
  RequestId: number;
  LoanDate: string;
  LoanValue: number;
  Remarks: string;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
