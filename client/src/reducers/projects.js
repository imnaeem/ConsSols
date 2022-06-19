const projectsReducer = (
  projects = { projects: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL_PROJECTS":
      return { projects: action.payload, fetched: true };
    //   case "UPDATE":
    //     return [...companies, action.payload];
    default:
      return projects;
  }
};

export default projectsReducer;
