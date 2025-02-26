// import { v4 } from "uuid";

/**
 * Crée un objet avec les propriétés fournies
 * @param properties - Propriétés à ajouter à l'objet
 * @returns L'objet créé
 */
export function createObject<T>(properties: Partial<T & { [key: string]: any }>): T {
  const result: T = {} as T;
  Object.keys(properties).forEach((key) => {
    (result as any)[key] = properties[key];
  });
  return result;
}

/**
 * Génère un identifiant unique (UUID)
 * @returns Un UUID unique
 */
// export function uuid(): string {
//   return v4();
// }

/**
 * Télécharge un fichier depuis une URL
 * @param url - URL du fichier à télécharger
 * @param filename - Nom du fichier à télécharger
 */
export async function downloadFromUrl(url: string, filename?: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const urlObject = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = urlObject;
  a.download = filename || "yatouze";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(urlObject);
}
