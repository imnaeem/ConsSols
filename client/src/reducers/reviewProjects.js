const reviewProjectsReducer = (
  state = { projects: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "PROJECTS_TO_REVIEW":
      return { projects: action.payload, fetched: true };

    default:
      return state;
  }
};

export default reviewProjectsReducer;
