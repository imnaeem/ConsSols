import * as api from "../api";
export const contactUs = (message) => async (dispatch) => {
  try {
    const { data } = await api.contactUs(message);

    dispatch({ type: "CONTACTUS_MESSAGES", payload: data });
  } catch (error) {
    return error;
  }
};
