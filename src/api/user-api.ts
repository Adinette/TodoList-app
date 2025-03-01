import { MODEL_KEY } from "../constants";
import { updateCollectionCache } from "../utils";
import { type IUser } from "../models";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getByIdUserService,
  editUserService,
} from "../services/user.service";
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

function handleMutationSuccess(qryClient: QueryClient, data: IUser) {
  updateCollectionCache([MODEL_KEY.USERS], qryClient, { data });
}

function useGetUsersApi(
  params?: object,
  options?: QueryOptions
) {
  return useGenericQuery([MODEL_KEY.USERS], () => getUserService(params), options);
}

function useGetUserApi(id: string, options?: QueryOptions) {
  return useGenericQuery([MODEL_KEY.USERS, id], () => getByIdUserService(id), options);
}

function useCreateUserApi(
  options?: UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, Partial<IUser>>
){
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, Partial<IUser>> & {
      onSuccess?: (
        data: AppResponseType<IUser>,
        variables: Partial<IUser>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.USERS],
    mutationFn: createUserService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

function useEditUserApi(
  options?: UseMutationOptions<
    AppResponseType<IUser>,
    ErrorResponseType,
    Partial<{ id: string; data: Partial<IUser> }>
  >
) {
  const queryClient = useQueryClient();
  const { onSuccess } =
    (options as UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, Partial<IUser>> & {
      onSuccess?: (
        data: AppResponseType<IUser>,
        variables: Partial<IUser>,
        context: unknown
      ) => void;
    }) || {};

  return useMutation({
    mutationKey: [MODEL_KEY.USERS],
    mutationFn: editUserService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

function useDeleteUserApi(
  options?: UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, string>  // Accepte un `string` ici
) {
  const queryClient = useQueryClient();

  return useMutation<AppResponseType<IUser>, ErrorResponseType, string>({
    mutationKey: [MODEL_KEY.USERS],
    mutationFn: (id: string) => deleteUserService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MODEL_KEY.USERS] });
    },
    ...options,
  });
}


export {
  useGetUsersApi,
  useGetUserApi,
  useEditUserApi,
  useCreateUserApi,
  useDeleteUserApi,
};
