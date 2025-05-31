export const toCamelCase = (words) => {
  if (!words || words.length === 0) return "";
  return words
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export const toPascalCase = (words) => {
  if (!words || words.length === 0) return "";
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

export const toSnakeCase = (words) => {
  if (!words || words.length === 0) return "";
  return words.map((word) => word.toLowerCase()).join("_");
};

export const toKebabCase = (words) => { // おまけ: ケバブケース
  if (!words || words.length === 0) return "";
  return words.map((word) => word.toLowerCase()).join("-");
};