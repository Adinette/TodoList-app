import { MODEL_KEY } from "../constants";
import { updateCollectionCache } from "../utils";
import { type ITask } from "../models/index";
import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  getByIdTaskService,
  editTaskService,
  editStatusTaskService,
} from "../services/task.service";
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
function handleMutationSuccess<T extends Record<string, any>>(qryClient: QueryClient, data: T) {
  updateCollectionCache<T>([MODEL_KEY.TASKS], qryClient, { data });
}

// Fetch all tasks
function useGetTasksApi(
  params?: object,
  options?: QueryOptions
) {
  return useGenericQuery([MODEL_KEY.TASKS], () => getTaskService(params), options);
}

// Fetch single task
function useGetTaskApi(id: string, options?: QueryOptions) {
  return useGenericQuery([MODEL_KEY.TASKS, id], () => getByIdTaskService(id), options);
}

// Create task mutation
function useCreateTaskApi(
  options?: UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, Partial<ITask>>
){
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, Partial<ITask>> & {
      onSuccess?: (
        data: AppResponseType<ITask>,
        variables: Partial<ITask>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.TASKS],
    mutationFn: createTaskService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

// Edit task mutation
function useEditTaskApi(
  options?: UseMutationOptions<
    AppResponseType<ITask>,
    ErrorResponseType,
    Partial<{ id: string; data: Partial<ITask> }>
  >
) {
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, Partial<ITask>> & {
      onSuccess?: (
        data: AppResponseType<ITask>,
        variables: { id: string; data: Partial<ITask> },
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.TASKS],
    mutationFn: editTaskService,
    onSuccess({ data }, id, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, id, context);
    },
    ...options,
  });
}

function useEditStatusTaskApi(
  options?: UseMutationOptions<
    AppResponseType<ITask>,
    ErrorResponseType,
    Partial<{ id: string; data: Partial<ITask> }>
  >
) {
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, Partial<ITask>> & {
      onSuccess?: (
        data: AppResponseType<ITask>,
        variables: Partial<ITask>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.TASKS],
    mutationFn: editStatusTaskService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

// Delete task mutation
function useDeleteTaskApi(
  options?: UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, string>
) {
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<ITask>, ErrorResponseType, string> & {
      onSuccess?: (
        data: AppResponseType<ITask>,
        variables: string,
        context: unknown
      ) => void;
    }) || {};

  return useMutation<AppResponseType<ITask>, ErrorResponseType, string>({
    mutationKey: [MODEL_KEY.TASKS],
    mutationFn: deleteTaskService,
    onSuccess(_, variables, context) {
      updateCollectionCache<ITask>([MODEL_KEY.TASKS], queryClient, {
        deleteItem: true,
      });

      if (onSuccess) {
        onSuccess?.(_, variables, context);
      }
    },
    ...options,
  });
}


export {
  useGetTasksApi,
  useGetTaskApi,
  useEditTaskApi,
  useCreateTaskApi,
  useDeleteTaskApi,
useEditStatusTaskApi
};
