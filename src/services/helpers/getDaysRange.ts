export const getDaysRange = (days: number) => {
  if (days <= 7) {
    return "do 7 dni";
  }

  if (days > 7 && days <= 14) {
    return "do 14 dni";
  }

  if (days > 14) {
    return "powyżej 14 dni";
  }
};
