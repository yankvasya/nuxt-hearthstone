export const getRandomNumber = (min = 0, max = 10): number =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomElements = <T>(array: T[], amount = 1): T[] => {
  let newArray = [...array];
  const result = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = getRandomNumber(0, newArray.length - 1);
    result.push(newArray[randomIndex]);
    newArray = newArray.filter((_, index) => index !== randomIndex);
  }

  return result;
};
