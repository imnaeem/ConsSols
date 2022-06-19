const companyPortfolioReducer = (
  state = { portfolios: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "ADD_COMPANY_PORTFOLIO":
      return { portfolios: [...state.portfolios, action.payload] };

    case "GET_COMPNAY_PORTFOLIOS":
      return { portfolios: action.payload, fetched: true };
    case "DELETE_COMPNAY_PORTFOLIO":
      return { portfolios: action.payload, fetched: true };
    default:
      return state;
  }
};

export default companyPortfolioReducer;
