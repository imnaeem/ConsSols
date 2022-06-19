import * as api from "../api";

export const signup = (values) => async (dispatch) => {
  try {
    const { data } = await api.signUp(values);

    dispatch({ type: "SIGNUP", data });
  } catch (error) {
    return error;
  }
};

export const signin = (values, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(values);

    await dispatch({ type: "SIGNIN", data });

    if (data.result.type === "company") {
      window.location.replace("/company/dashboard");
      //navigate("/company/dashboard", { replace: true });
    } else if (data.result.type === "client") {
      window.location.replace("/client/dashboard");
      // navigate("/client/dashboard", { replace: true });
    } else if (data.result.type === "admin") {
      window.location.replace("/admin/dashboard");
      // navigate("/admin/dashboard", { replace: true });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
