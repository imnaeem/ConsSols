import * as api from "../api";

export const getAllProject = () => async (dispatch) => {
  try {
    const { data } = await api.getAllProject();
    // console.log(data);
    dispatch({ type: "FETCH_ALL_PROJECTS", payload: data });
  } catch (error) {
    return console.log(error);
  }
};

export const getProjectsForCompany = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProjectsForCompany(id);
    //console.log(data);
    dispatch({ type: "FETCH_ALL_PROJECTS", payload: data });
  } catch (error) {
    return console.log(error);
  }
};
