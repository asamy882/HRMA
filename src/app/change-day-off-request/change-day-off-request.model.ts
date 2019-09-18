export class ChangeDayOffRequest {
  Shift: any;
  RequestId: number;
  OldDayOffDate: string;
  NewDayOffDate: string;
  Remarks: string;
  AllowedActions: number;
  AllowedComments: boolean;
  CommentsMandatory: boolean;
}
