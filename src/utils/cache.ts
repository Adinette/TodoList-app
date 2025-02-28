import { QueryClient, QueryFilters } from '@tanstack/vue-query';
import { AppResponseType } from "../types/index";

/**
 * Mise à jour du cache d'une collection
 * @param collectionCacheKey - Clé de la collection
 * @param queryClient - Instance du client de requête
 * @param options - Options de mise à jour
 */
export function updateCollectionCache<T extends Record<string, any>>(
  collectionCacheKey: (string | object)[],
  queryClient: QueryClient,
  options: {
    data?: T;
    idKey?: keyof T;
    invalidate?: boolean;
    deleteItem?: boolean;
    variables?: T;
  }
): void {
  const {
    invalidate = true,
    deleteItem = false,
    data,
    idKey = "id",
    variables,
  } = options;

  if (!deleteItem && !data) {
    throw new Error("Data must be provided.");
  }

  const collection = queryClient.getQueryData<AppResponseType<T[]>>(collectionCacheKey);

  if (collection) {
    const { data: items, meta } = collection;

    if (deleteItem && variables && idKey) {
      const updatedItems = items.filter((item) => item[idKey] !== variables);

      queryClient.setQueryData<AppResponseType<T[]>>(collectionCacheKey, {
        data: updatedItems,
        meta: { ...meta, total: Math.max((meta?.total || 0) - 1, 0) },
      });

      queryClient.removeQueries([ ...collectionCacheKey, variables ] as QueryFilters);
    } else {
      const itemId = data[idKey];
      const itemIndex = items.findIndex((item) => item[idKey] === itemId);

      const updatedItems = itemIndex >= 0
        ? [ ...items.slice(0, itemIndex), { ...items[itemIndex], ...data }, ...items.slice(itemIndex + 1) ]
        : [ ...items, data ];

      queryClient.setQueryData<AppResponseType<T[]>>(collectionCacheKey, {
        data: updatedItems,
        meta: { ...meta, total: itemIndex < 0 ? (meta?.total || 0) + 1 : meta?.total || 0 },
      });

      queryClient.setQueryData<T>([...collectionCacheKey, itemId], (oldData) => ({ ...oldData, ...data }));
    }
  } else {
    queryClient.setQueryData<AppResponseType<T[]>>(collectionCacheKey, {
      data: [data],
      meta: { total: 1, per_page: 1, last_page: 1 },
    });

    queryClient.setQueryData<T>([...collectionCacheKey, data[idKey]], data);
  }

  if (invalidate) {
    queryClient.invalidateQueries({ queryKey: collectionCacheKey });
    queryClient.invalidateQueries({ queryKey: [...collectionCacheKey, data[idKey] ?? variables] });
  }
}
