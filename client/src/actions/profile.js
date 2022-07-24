import * as api from "../api";
export const getUserProfile = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserProfile(id);
    //console.log(data);
    dispatch({ type: "GET_COMPANY_USER", payload: data });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateUserProfile(user);

    dispatch({ type: "UPDATE_COMPANY_PROFILE", payload: data });
  } catch (error) {
    return error;
  }
};
