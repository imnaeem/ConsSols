const allReviewsReducer = (state = { reviews: [], fetched: false }, action) => {
  switch (action.type) {
    case "ALL_CLIENT_REVIEWS":
      return { reviews: action.payload, fetched: true };
    case "ALL_COMPANY_REVIEWS":
      return { reviews: action.payload, fetched: true };
    default:
      return state;
  }
};

export default allReviewsReducer;
