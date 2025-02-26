import { type PromisedAppResponseType } from "../types";
import requestService from "./request.service";
import { type ITask } from "../models";
import { MODEL_KEY } from "../constants";

const request = requestService({ urlKey: MODEL_KEY.TASKS });

function getTaskService(
  params?: object
): PromisedAppResponseType<ITask[]> {
  return request.get("", params);
}

function getByIdTaskService(id: string): PromisedAppResponseType<ITask> {
  return request.get(id);
}

function createTaskService(
  data: Partial<ITask>
): PromisedAppResponseType<ITask> {
  return request.post("", data);
}

function editTaskService({
  id,
  data,
}: {
  id: string;
  data: Partial<ITask>;
}): PromisedAppResponseType<ITask> {
  return request.put(id, data);
}

function deleteTaskService(id: string): PromisedAppResponseType<ITask> {
  return request.del(id);
}

export {
  getTaskService,
  getByIdTaskService,
  createTaskService,
  editTaskService,
  deleteTaskService,
};
