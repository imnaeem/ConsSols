import * as api from "../api";

export const getCompanyProfile = (id) => async (dispatch) => {
  //   console.log(id);
  try {
    const { data } = await api.getCompanyProfile(id);
    //console.log(data);
    dispatch({ type: "GET_COMPANY_PROFILE", payload: data });
  } catch (error) {
    return error;
  }
};

export const updateCompanyProfile = (company) => async (dispatch) => {
  try {
    const { data } = await api.updateCompanyProfile(company);
    dispatch({ type: "UPDATE_COMPANY_PROFILE", payload: data });
  } catch (error) {
    return error;
  }
};

export const addCompanyPortfolio = (portfolio) => async (dispatch) => {
  try {
    const { data } = await api.addCompanyPortfolio(portfolio);
    //console.log(data);
    dispatch({ type: "ADD_COMPANY_PORTFOLIO", payload: data });
  } catch (error) {
    return error;
  }
};

export const getCompanyPortfolios = (id) => async (dispatch) => {
  //console.log(id);
  try {
    const { data } = await api.getCompanyPortfolios(id);
    //console.log(data);
    dispatch({ type: "GET_COMPNAY_PORTFOLIOS", payload: data });
  } catch (error) {
    return error;
  }
};

export const sendProposal = (proposal) => async (dispatch) => {
  try {
    const { data } = await api.sendProposal(proposal);
    //console.log(data);
    dispatch({ type: "SEND_PROPOSAL", payload: data });
  } catch (error) {
    return error;
  }
};

export const getCompanyProposals = (id) => async (dispatch) => {
  // console.log(id);
  try {
    const { data } = await api.getCompanyProposals(id);
    //console.log(data);
    dispatch({ type: "GET_ALL_PROPOSALS", payload: data });
    //return data;
  } catch (error) {
    return error;
  }
};

export const getProposalProject = (projectId) => async (dispatch) => {
  try {
    const { data } = await api.getProposalProject(projectId);
    return data;
    //console.log(data);
    // dispatch({ type: "GET_PROPOSAL_PROJECT", payload: data });
  } catch (error) {
    return error;
  }
};

export const markProjectCompleted = (projectId, userId) => async (dispatch) => {
  //console.log(id);
  try {
    const { data } = await api.markProjectCompleted(projectId, userId);

    //console.log(data);

    dispatch({ type: "COMPLETE_PROJECT", payload: data });
  } catch (error) {
    return error;
  }
};

export const getCompanyReviews = (id) => async (dispatch) => {
  //console.log(id);
  try {
    const { data } = await api.getCompanyReviews(id);
    dispatch({ type: "ALL_COMPANY_REVIEWS", payload: data });
    //console.log(data);
    //return data;
  } catch (error) {
    return error;
  }
};

export const checkCompanyProfile = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCompanyProfile(id);

    dispatch({ type: "CHECK_COMPANY_PROFILE", payload: data });
  } catch (error) {
    return error;
  }
};

export const deleteCompanyPortfolio = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCompanyPortfolio(id);

    dispatch({ type: "DELETE_COMPNAY_PORTFOLIO", payload: data });
  } catch (error) {
    return error;
  }
};

export const promoteCompany = (promotion) => async (dispatch) => {
  try {
    const { data } = await api.promoteCompany(promotion);

    dispatch({ type: "PROMOTE_COMPANY", payload: data });
  } catch (error) {
    return error;
  }
};

export const getCompanyPromotions = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCompanyPromotions(id);

    dispatch({ type: "GET_COMPNAY_PROMOTIONS", payload: data });
  } catch (error) {
    return error;
  }
};
