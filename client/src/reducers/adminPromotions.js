const adminPromotionsReducer = (
  state = { promotions: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "APPROVE_PROMOTION":
      return { promotions: action.payload, fetched: true };

    case "DISAPPROVE_PROMOTION":
      return { promotions: action.payload, fetched: true };
    case "CLOSE_PROMOTION":
      return { promotions: action.payload, fetched: true };

    case "ALL_ADMIN_PROMOTIONS":
      return { promotions: action.payload, fetched: true };
    default:
      return state;
  }
};

export default adminPromotionsReducer;
