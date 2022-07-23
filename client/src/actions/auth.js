import * as api from "../api";

export const signup = (values) => async (dispatch) => {
  try {
    const { data } = await api.signUp(values);
    dispatch({ type: "SIGNUP", data });
  } catch (error) {
    return error;
  }
};

export const signin = (values) => async (dispatch) => {
  try {
    const { data } = await api.signIn(values);

    await dispatch({ type: "SIGNIN", data });

    if (data.result.type === "company") {
      window.location.replace("/company/dashboard");
    } else if (data.result.type === "client") {
      window.location.replace("/client/dashboard");
    } else if (data.result.type === "admin") {
      window.location.replace("/admin/dashboard");
    }
    // return data;
  } catch (error) {
    return error;
  }
};
