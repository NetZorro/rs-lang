export interface IUserAuth {
  email: string;
  password: string;
}
export interface IUserReg {
  name: string;
  email: string;
  password: string;
}
export interface IUserObj {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}