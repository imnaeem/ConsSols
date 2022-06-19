const checkCompanyProfileReducer = (
  company = { company: {}, fetched: false },
  action
) => {
  switch (action.type) {
    case "CHECK_COMPANY_PROFILE":
      return { company: action.payload, fetched: true };
    case "GET_CURRENT_COMPANY":
      return { company: action.payload, fetched: true };
    default:
      return company;
  }
};

export default checkCompanyProfileReducer;
