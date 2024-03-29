export class MissionRequest {
  RequestId: number;
  MissionDate: string;
  MissionEndDate: string;
  FromTime: string;
  ToTime: string;
  Remarks: string;
  ExtendNextDay = false;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
  WorkflowInstanceId: string;
  MissionType: any;
  MissionTypeId: string;
  MissionDistance: any;
  MissionDistanceId: string;
}
