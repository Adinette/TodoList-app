import { MODEL_KEY } from "../constants";
import { updateCollectionCache } from "../utils";
import { type IStatusTask } from "../models";
import { type ErrorResponseType } from "../types";
import { type AppResponseType } from "../types";
import {
  QueryClient,
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type QueryOptions,
} from "@tanstack/vue-query";
import { getStatusTaskService } from "../services/task-status.service";
import { createTaskService, deleteTaskService, editTaskService, getByIdTaskService } from "../services/task.service";

// Generic hook for handling common query logic
function useGenericQuery<T>(
  queryKey: (string | object)[],
  queryFn: () => Promise<AppResponseType<T>>,
  options?: QueryOptions
){
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

// Common function for mutation success handling
function handleMutationSuccess(qryClient: QueryClient, data: IStatusTask) {
  updateCollectionCache([MODEL_KEY.STATUSTASKS], qryClient, { data });
}

// Fetch all tasks status
function useGetStatusTasksApi(
  params?: object,
  options?: QueryOptions
) {
  return useGenericQuery([MODEL_KEY.STATUSTASKS], () => getStatusTaskService(params), options);
}

// Fetch single task
function useGetStatusTaskApi(id: string, options?: QueryOptions) {
  return useGenericQuery([MODEL_KEY.STATUSTASKS, id], () => getByIdTaskService(id), options);
}

// Create task mutation
function useCreateStatusTaskApi(
  options?: UseMutationOptions<AppResponseType<IStatusTask>, ErrorResponseType, Partial<IStatusTask>>
){
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<IStatusTask>, ErrorResponseType, Partial<IStatusTask>> & {
      onSuccess?: (
        data: AppResponseType<IStatusTask>,
        variables: Partial<IStatusTask>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.STATUSTASKS],
    mutationFn: createTaskService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

// Edit task mutation
function useEditStatusTaskApi(
  options?: UseMutationOptions<
    AppResponseType<IStatusTask>,
    ErrorResponseType,
    Partial<{ id: string; data: Partial<IStatusTask> }>
  >
) {
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<IStatusTask>, ErrorResponseType, Partial<IStatusTask>> & {
      onSuccess?: (
        data: AppResponseType<IStatusTask>,
        variables: Partial<IStatusTask>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.STATUSTASKS],
    mutationFn: editTaskService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

// Delete task mutation
function useDeleteStatusTaskApi(
  options?: UseMutationOptions<AppResponseType<IStatusTask>, ErrorResponseType, string>
) {
  const queryClient = useQueryClient();

  return useMutation<AppResponseType<IStatusTask>, ErrorResponseType, string>({
    mutationKey: [MODEL_KEY.STATUSTASKS],
    mutationFn: (id: string) => deleteTaskService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MODEL_KEY.STATUSTASKS] });
    },
    ...options,
  });
}


export {
  useGetStatusTasksApi,
  useGetStatusTaskApi,
  useEditStatusTaskApi,
  useCreateStatusTaskApi,
  useDeleteStatusTaskApi,
};
