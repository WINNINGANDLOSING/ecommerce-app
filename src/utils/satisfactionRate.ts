type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
export const getSatisfactionRate = (reviews: Review[]): number => {
  const highRating = 4;
  if (reviews.length === 0) {
    return 0;
  }
  const satifisfiedReviews = reviews.filter(
    review => review.rating >= highRating,
  );
  return Math.round((satifisfiedReviews.length / reviews.length) * 100);
};
