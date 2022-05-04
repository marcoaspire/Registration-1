export interface AuthResponse {
  ok: boolean;
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  msg?: string;

}
export interface AccountType {
  accountTypeID?: string;
  type?: string;

}
export interface User {
  UserID?: number;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  EmailAddress: string;
  MobilePhone: string;
  Last4DigitsSSN: string;
  TermsandConditions: boolean;
  MaxLoginAttempt?: number;
  LastLogin?: Date;
  Status: string;
  EnrolledDate: Date;
}















