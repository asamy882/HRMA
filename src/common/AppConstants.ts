import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConstants {
  public static API_ENDPOINT;// = 'https://hrapi.quattro-trading.com';

  public static getApiEndpoin(){
    if(!this.API_ENDPOINT){
      this.API_ENDPOINT = localStorage.getItem("API_ENDPOINT");
      return this.API_ENDPOINT;      
    } else {
      return this.API_ENDPOINT;
    }
  }
 

  // Status
  public static REVIEWED = 4;
  public static APPROVE = 5;
  public static REJECT = 6;
  public static CHANGE_REQUEST = 7;

  // Requests
  public static VACATION_REQUEST = 1;
  public static MISSION_REQUEST = 2;
  public static PENALTY_REQUEST = 3;
  public static LOAN_REQUEST = 4;
  public static CHANGE_SHIFT_REQUEST = 5;
  public static CHANGE_DAYOFF_REQUEST = 6;
  public static SHIFT_PLAN_REQUEST = 7;
  public static WORK_IN_DAYOFF_REQUEST = 8;
  public static OVERTIME_REQUEST = 9;
  public static WORK_IN_WEEKLY_RESET_REQUEST = 10;
  public static CHANGE_WEEKLY_RESET_REQUEST = 11;
  public static ABSENCE_WITH_PERMISSION_REQUEST = 12;
  public static PERMISSION_REQUEST = 13;

  // Actions
  public static INITIATE = 1;
  public static REVIEW = 2;
  public static APPROVE_REJECT = 3;
  public static APPROVE_REJECT_CHANGE_REQUEST = 4;

  //Mission Type
  public WORK_MISSION = 1;
  public WORK_FROM_HOME = 2;
  public MAX_MISSION_LOCATIONS = 5;

  //Screens
  public  VACATION_REQUEST_PAGE = 'VacationRequest';
  public  MISR_VACATION_REQUEST_PAGE = 'VacationRequestMisr';
  public  MISSION_REQUEST_PAGE = 'MissionRequest';
  public  PENALTY_REQUEST_PAGE = 'PenaltyRequest';
  public  LOAN_REQUEST_PAGE = 'LoanRequest';
  public  CHANGE_SHIFT_REQUEST_PAGE = 'ChangeShiftRequest';
  public  CHANGE_DAYOFF_REQUEST_PAGE = 'ChangeDayOffRequest';
  public  WORK_IN_DAYOFF_REQUEST_PAGE = 'WorkinDayoffRequest';
  public  OVERTIME_REQUEST_PAGE = 'OverTimeRequest';
  public  PERMISSION_REQUEST_PAGE = 'PermissionRequest';
  public  MISR_PERMISSION_REQUEST_PAGE = 'PermissionRequestMisr';
  public  MISR_MISSION_REQUEST_PAGE = 'MissionRequestMisr';
  public  QT_MISSION_REQUEST_PAGE = 'MissionRequestQT';
  public  QT_WORK_IN_DAYOFF_REQUEST_PAGE = 'WorkinDayoffRequestQT';
  public  QT_PENALTY_REQUEST_PAGE = 'PenaltyRequestQT';
  public  QT_VACATION_REQUEST_PAGE = 'VacationRequestQT';
  public  SHIFT_PLAN_REQUEST_PAGE = 7;
  public  WORK_IN_WEEKLY_RESET_REQUEST_PAGE = 10;
  public  CHANGE_WEEKLY_RESET_REQUEST_PAGE = 11;
  public  ABSENCE_WITH_PERMISSION_REQUEST_PAGE = 12;
  public  SALARY_DETAILS_PAGE = 'SalaryDetails';
  public  ATTENDANCE_SHEET_PAGE = 'AttendanceSheet';
  public  SIGN_IN_OUT_PAGE = 'SignInOut';
  public  ARABIA_MISSION_REQUEST_PAGE = 'MissionRequestArabia';
  public  ARABIA_MISSION_ATTENDNACE_PAGE = 'MissionAttendnace';

}


