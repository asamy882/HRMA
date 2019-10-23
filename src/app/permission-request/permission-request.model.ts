export class PermissionRequest {
  PermissionType: any;
  RequestId: number;
  PermissionDate: string;
  FromTime: string;
  ToTime: string;
  Remarks: string;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
}
