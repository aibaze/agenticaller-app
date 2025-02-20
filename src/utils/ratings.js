export function calculateRatingStats(ratings) {
  // Check if the input is an array
  if (!Array.isArray(ratings)) {
    throw new Error('Input should be an array');
  }

  // Initialize star counts dynamically
  const initialStarCounts = Array.from({ length: 5 }, (_, i) => ({
    name: `${i + 1} star`,
    starCount: 0,
    reviewCount: 0,
  }));

  // Check if the array is empty
  if (ratings.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratings: initialStarCounts,
    };
  }

  // Check if each object in the array has a valid ratingNumber
  ratings.forEach((rating, index) => {
    if (
      typeof rating.ratingNumber !== 'number' ||
      rating.ratingNumber < 1 ||
      rating.ratingNumber > 5
    ) {
      throw new Error(`Invalid ratingNumber at index ${index}`);
    }
  });

  const totalReviews = ratings.length;
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.ratingNumber, 0);
  const averageRating = (totalRatings / totalReviews).toFixed(1);

  // Clone the initialStarCounts to avoid modifying the original
  const starCounts = initialStarCounts.map((star) => ({ ...star }));

  // Count the number of reviews for each star rating
  ratings.forEach((rating) => {
    const starIndex = rating.ratingNumber - 1;
    starCounts[starIndex].starCount++;
    starCounts[starIndex].reviewCount++;
  });

  return {
    totalReviews,
    averageRating,
    ratings: starCounts,
  };
}
