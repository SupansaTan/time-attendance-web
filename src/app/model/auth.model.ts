export class LoginModel {
  constructor() {
    this.email = '';
    this.password = '';
  }
  public email: string;
  public password: string;
}

export class ConfirmedRegisterModel {
  constructor() {
    this.email = '';
    this.confirmedToken = '';
  }
  public email: string;
  public confirmedToken: string;
}

export class ResponseLoginModel {
  public data: TokenModel;
  public message: string;
  public status: number;
}

export class TokenModel {
  public token: string;
}

export interface ResponseModel<Type> {
  data: Type,
  status: number,
  message: string,
}
