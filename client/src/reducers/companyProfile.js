const INITIAL_STATE = {
  userId: "",
  companyName: "",
  tagline: "",
  founded: "",
  employees: "",
  rate: "",
  website: "",
  phone: "",
  email: "",
  username: "",
  companyImage: "",

  address: {
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    formatted: "",
  },
  summary: "",
  services: [{ title: "", details: "" }],
  //   services: "",
};

const companyProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_COMPANY_PROFILE":
      return { ...state, ...action.payload };

    case "UPDATE_COMPANY_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default companyProfileReducer;
