const clientProjectReducer = (state = [], action) => {
  switch (action.type) {
    case "CLIENT_ADD_PROJECT":
      return [...state, action.payload];

    case "GET_CLIENT_PROJECTS":
      return action.payload;
    case "CLOSE_CLIENT_PROJECT":
      return state.map((project) =>
        project._id === action.payload._id
          ? {
              ...project,
              status: action.payload.status,
            }
          : project
      );
    case "COMPLETE_PROJECT":
      return state.map((project) =>
        project._id === action.payload._id
          ? {
              ...project,
              status: action.payload.status,
            }
          : project
      );
    default:
      return state;
  }
};

export default clientProjectReducer;
