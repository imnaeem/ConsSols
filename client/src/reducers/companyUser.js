const INITIAL_STATE = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  userImage: "",
};

const companyUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_COMPANY_USER":
      action.payload["oldPassword"] = "";
      action.payload["newPassword"] = "";
      action.payload["confirmPassword"] = "";
      return action.payload;
    case "UPDATE_COMPANY_USER":
      return action.payload;
    default:
      return state;
  }
};

export default companyUserReducer;
