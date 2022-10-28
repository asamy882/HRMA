export class PenaltyRequest {
  RequestId: number;
  PenaltyTypeId: number;
  PenaltyReason: any;
  PenaltyValue: number;
  DeductionFactor: number;
  PenaltyCause: string;
  PenaltyDate: string;
  Employee: any;
  PenaltyTypeName: string;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
