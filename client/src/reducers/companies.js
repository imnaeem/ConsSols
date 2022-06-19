const companiesReducer = (
  companies = { companies: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL_COMPANIES":
      return { companies: action.payload, fetched: true };
    case "SEARCHED_COMPANIES":
      return { companies: action.payload, fetched: true };
    default:
      return companies;
  }
};

export default companiesReducer;
