const authReducer = (state = { signupData: null }, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, authData: action.data, loading: false, errors: null };
    case "SIGNIN":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case "LOGOUT":
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
