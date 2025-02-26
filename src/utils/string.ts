/**
 * Récupère les initiales à partir d'un texte
 * @param text - Le texte à analyser
 * @returns Les initiales
 */
export function getInitiales(text?: string): string {
  if (text && typeof text === "string") {
    const words = text.split(" ");
    return words.length > 1
      ? words[0].charAt(0) + words[1].charAt(0)
      : words[0].charAt(0);
  }
  return "";
}

/**
 * Tronque une chaîne de texte à une longueur donnée
 * @param text - Le texte à tronquer
 * @param length - Longueur maximale
 * @param trailing - Si `true`, ajoute des points de suspension
 * @returns Texte tronqué
 */
export function truncateText(text: string, length: number, trailing = false): string {
  if (text.length > length) {
    return `${text.slice(0, length)}${trailing ? "..." : ""}`;
  }
  return text;
}

/**
 * Récupère la valeur d'une variable avec un message par défaut si elle est vide
 * @param value - La valeur à vérifier
 * @param alert - Si `true`, retourne "Non renseigné" si la valeur est vide
 * @returns La valeur ou un message par défaut
 */
export function getValue(value: any, alert = true): any {
  return value !== undefined && value !== null ? value : (alert ? "Non renseigné" : "");
}
