export const getTotalReviewsDesc = (total: any) => {
  if (total) {
    if (total > 0 && total <= 1) {
      return "opinia";
    }
    if (total > 1 && total <= 4) {
      return "opinie";
    }
    if (total > 4) {
      return "opinii";
    }
  } else {
    return "opinii";
  }
};
