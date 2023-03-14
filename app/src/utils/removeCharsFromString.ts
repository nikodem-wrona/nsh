export const removeCharsFromString = (str: string, characters: string[]): string => {
  const charsToRemove = characters;
  let newStr = str;

  while (charsToRemove.includes(newStr[0])) {
    newStr = newStr.slice(1);
  }

  while (charsToRemove.includes(newStr[newStr.length - 1])) {
    newStr = newStr.slice(0, newStr.length - 1);
  }

  return newStr;
}
