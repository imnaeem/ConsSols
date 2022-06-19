import * as api from "../api";

export const getAllCompanies = () => async (dispatch) => {
  // console.log("dd");
  try {
    const { data } = await api.getAllCompanies();
    //console.log(data);
    dispatch({ type: "FETCH_ALL_COMPANIES", payload: data });
  } catch (error) {
    return error;
  }
};

export const getCurrentCompany = (username) => async (dispatch) => {
  // console.log(username);
  try {
    const { data } = await api.getCurrentCompany(username);
    //console.log(data);
    dispatch({ type: "GET_CURRENT_COMPANY", payload: data });
  } catch (error) {
    return error;
  }
};

export const currentCompanyReviews = (username) => async (dispatch) => {
  //console.log(id);
  try {
    const { data } = await api.currentCompanyReviews(username);
    dispatch({ type: "ALL_COMPANY_REVIEWS", payload: data });
    //console.log(data);
    //return data;
  } catch (error) {
    return error;
  }
};

export const getSearchedCompanies = (search) => async (dispatch) => {
  // console.log("dd");
  try {
    const { data } = await api.getSearchedCompanies(search);
    //console.log(data);
    dispatch({ type: "SEARCHED_COMPANIES", payload: data });
  } catch (error) {
    return error;
  }
};
