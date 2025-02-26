import { type IUser } from "../models";
import requestService from "./request.service";
import { type PromisedAppResponseType } from "../types";

const request = requestService({});

function signInService(credentials: {
  email: string;
  password: string;
}): PromisedAppResponseType<IUser> {
  return request.post("auth/login", credentials);
}

function forgotPasswordService(credentials: {
  email: string;
}): PromisedAppResponseType<IUser> {
  return request.post("auth/forgot-password", credentials);
}

function resetPasswordService(credentials: {
  newPassword: string;
  confirmPassword: string;
  token: string;
}): PromisedAppResponseType<IUser> {
  return request.post(`auth/reset-password/${credentials.token}`, {
    newPassword: credentials.newPassword,
    confirmPassword: credentials.confirmPassword
  });
}

function signOutService(): PromisedAppResponseType<null> {
  return request.post("auth/logout");
}

export { signInService, signOutService, forgotPasswordService, resetPasswordService };
