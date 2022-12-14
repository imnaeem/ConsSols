import * as api from "../api";
export const cleintAddProject = (project) => async (dispatch) => {
  //console.log("client action");
  try {
    const { data } = await api.cleintAddProject(project);
    // console.log(data);
    dispatch({ type: "CLIENT_ADD_PROJECT", payload: data });
  } catch (error) {
    return error;
  }
};

export const getClientProjects = (id) => async (dispatch) => {
  try {
    const { data } = await api.getClientProjects(id);
    //console.log(data);
    dispatch({ type: "GET_ALL_CLIENT_PROJECTS", payload: data });
  } catch (error) {
    return error;
  }
};

export const closeClientProject = (id) => async (dispatch) => {
  //console.log(id);
  try {
    const { data } = await api.closeClientProject(id);

    //console.log(data);

    dispatch({ type: "CLOSE_CLIENT_PROJECT", payload: data });
  } catch (error) {
    return error;
  }
};

export const getProjectProposals = (projectId) => async (dispatch) => {
  try {
    const { data } = await api.getProjectProposals(projectId);
    //return data;
    dispatch({ type: "GET_PROJECT_PROPOSALS", payload: data });
  } catch (error) {
    return error;
  }
};

export const acceptCompanyProposal = (proposalId) => async (dispatch) => {
  console.log(proposalId);
  try {
    const { data } = await api.acceptCompanyProposal(proposalId);
    dispatch({ type: "ACCEPT_PROPOSAL", payload: data });
    // console.log(data);
    // return data;
  } catch (error) {
    return error;
  }
};

export const getProposalCompany = (proposalId) => async (dispatch) => {
  //console.log(proposalId);
  try {
    const { data } = await api.getProposalCompany(proposalId);
    dispatch({ type: "ACCEPT_PROPOSAL", payload: data });
    // console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getClientReviews = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.getClientReviews(id);
    dispatch({ type: "ALL_CLIENT_REVIEWS", payload: data });
    //console.log(data);
    //return data;
  } catch (error) {
    return error;
  }
};

export const getProjectsToReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProjectsToReview(id);
    dispatch({ type: "PROJECTS_TO_REVIEW", payload: data });
  } catch (error) {
    return error;
  }
};

export const cleintAddReview = (review) => async (dispatch) => {
  //console.log(review);
  //console.log(projectId);
  try {
    const { data } = await api.cleintAddReview(review);
    // console.log(data);
    dispatch({ type: "CLIENT_ADD_REVIEW", payload: data });
  } catch (error) {
    return error;
  }
};
