const projectProposalsReducer = (
  state = { proposals: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "GET_PROJECT_PROPOSALS":
      return { proposals: action.payload, fetched: true };

    case "ACCEPT_PROPOSALS":
      return state.proposals.map((proposal) =>
        proposal._id === action.payload._id
          ? {
              ...proposal,
              status: action.payload.status,
            }
          : proposal
      );

    default:
      return state;
  }
};

export default projectProposalsReducer;
