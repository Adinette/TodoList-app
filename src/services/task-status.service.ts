import { type AppResponseType, type PromisedAppResponseType } from "../types";
import requestService from "./request.service";
import { type IStatusTask } from "../models";
import { MODEL_KEY } from "../constants";

const request = requestService({ urlKey: MODEL_KEY.STATUSTASKS });

function getStatusTaskService(
  params?: object
): PromisedAppResponseType<IStatusTask[]> {
  return request.get("", params);
}

function getByIdStatusTaskService(id: string): PromisedAppResponseType<IStatusTask> {
  return request.get(id);
}

function createStatusTaskService(
  data: Partial<IStatusTask>
): PromisedAppResponseType<IStatusTask> {
  return request.post("", data);
}

function editStatusTaskService({
  id,
  data,
}: {
  id: string;
  data: Partial<IStatusTask>;
}): PromisedAppResponseType<IStatusTask> {
  return request.put(id, data);
}


function deleteStatusTaskService(id: string): Promise<AppResponseType<IStatusTask>> {
  return request.del(id);
}

export {
  getStatusTaskService,
  getByIdStatusTaskService,
  createStatusTaskService,
  editStatusTaskService,
  deleteStatusTaskService,
};
