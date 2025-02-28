import { COOKIE_ATTRIBUTES, MODEL_KEY, ROUTES } from "../constants";
import jsCookie from "../lib/cookie";
import type { IUser } from "../models";
import { forgotPasswordService, resetPasswordService, signInService, signOutService } from "../services/auth.service";
import { useUserStore } from "../stores/user-store";
import type { AppResponseType, ErrorResponseType } from "../types";
import { updateCollectionCache } from "../utils/cache";
import { QueryClient, useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/vue-query";
import { useRouter, useRoute } from "vue-router";

function handleMutationSuccess<T extends Record<string, any>>(qryClient: QueryClient, data: T) {
  updateCollectionCache<T>([MODEL_KEY.USERS], qryClient, { data });
}

function useSignInApi() {
  const userStore = useUserStore();
  const { setUser } = userStore;
  const route = useRoute();
  const next = route.query.next || ROUTES.DASHBOARD.ROOT;
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth"],
    mutationFn: signInService,
    onSuccess({ data }) {
      setUser(data);
      router.push(next as string);
    },
  });
}

function useResetPasswordInApi(  options?: UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, Partial<IUser>>
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
    mutationFn: resetPasswordService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

function useForgotPasswordInApi(  options?: UseMutationOptions<AppResponseType<IUser>, ErrorResponseType, Partial<IUser>>
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
    mutationFn: forgotPasswordService,
    onSuccess({ data }, variables, context) {
      handleMutationSuccess(queryClient, data);
      onSuccess?.({ data }, variables, context);
    },
    ...options,
  });
}

function useSignOutApi() {
  const cookie = jsCookie();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userStore = useUserStore();
  const { clearUser } = userStore;

  return useMutation({
    mutationKey: ["auth"],
    mutationFn: signOutService,
    onSettled() {
      cookie.remove(COOKIE_ATTRIBUTES.TOKEN);
      queryClient.clear();
      clearUser();
      router.push("/" + ROUTES.AUTH.SIGNIN);
    },
  });
}

export { useSignInApi, useSignOutApi, useResetPasswordInApi,useForgotPasswordInApi };
