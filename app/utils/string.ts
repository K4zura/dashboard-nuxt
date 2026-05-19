export const capitalizeFirstLetter = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  const str = String(value);

  if (!str.length) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};
