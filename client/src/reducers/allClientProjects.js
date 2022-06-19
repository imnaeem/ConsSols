const allClientsProjectsReducer = (
  state = { projects: [], fetched: false },
  action
) => {
  switch (action.type) {
    case "GET_ALL_CLIENT_PROJECTS":
      return { projects: action.payload, fetched: true };
    default:
      return state;
  }
};

export default allClientsProjectsReducer;
