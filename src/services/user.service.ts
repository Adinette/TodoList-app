import { type PromisedAppResponseType } from "../types";
import requestService from "./request.service";
import { type IUser } from "../models";
import { MODEL_KEY } from "../constants";

const request = requestService({ urlKey: MODEL_KEY.USERS });

function getUserService(params?: object): PromisedAppResponseType<IUser[]> {
  return request.get("", params);
}

function getByIdUserService(id: string): PromisedAppResponseType<IUser> {
  return request.get(id);
}

function createUserService(data: Partial<IUser>): PromisedAppResponseType<IUser> {
  return request.post("/register", data);
}

function editUserService({
  id,
  data,
}: {
  id: string;
  data: Partial<IUser>;
}): PromisedAppResponseType<IUser> {
  return request.put(id, data);
}

function deleteUserService(id: string): PromisedAppResponseType<IUser> {
  return request.del(id);
}

export {
  getUserService,
  getByIdUserService,
  createUserService,
  editUserService,
  deleteUserService,
};
