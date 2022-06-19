const companyPromotionReducer = (
  state = { promotions: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "PROMOTE_COMPANY":
      return { promotions: [...state.promotions, action.payload] };

    case "GET_COMPNAY_PROMOTIONS":
      return { promotions: action.payload, fetched: true };
    default:
      return state;
  }
};

export default companyPromotionReducer;
