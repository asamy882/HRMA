export class VactionRequest {
  FromDate: string;
  ToDate: string;
  Remarks: string;
  VacationDays: number;
  VacationTypeId: number;
  Balance: number;
  ExcludeWeekend = true;
  ReplacementId: number;
}
