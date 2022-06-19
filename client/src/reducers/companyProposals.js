const companyProposalsReducer = (
  state = { proposals: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "SEND_PROPOSAL":
      return action.payload;

    case "GET_ALL_PROPOSALS":
      return { proposals: action.payload, fetched: true };

    default:
      return state;
  }
};

export default companyProposalsReducer;
