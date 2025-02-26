type AppResponseType<T> = {
  data: T;
  message?: string;
  meta?: { total?: number; per_page?: number; last_page?: number };
};

type ErrorResponseType = {
  [key: string]: string[];
};

export type TColumnImport = {
  value: string | null;
  label: string;
};

type PromisedAppResponseType<T> = Promise<AppResponseType<T>>;

export type { AppResponseType, PromisedAppResponseType, ErrorResponseType };
