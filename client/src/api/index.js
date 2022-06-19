import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signUp = (values) => API.post("/user/signup", values);

export const signIn = (values) => API.post("/user/signin", values);

export const getProjectsForCompany = (id) =>
  API.get("/find-projects", {
    params: {
      id,
    },
  });

export const getAllProject = () => API.get("/find-projects");

export const getCompanyProfile = (id) =>
  API.get("/company/edit-company", {
    params: {
      id,
    },
  });
export const updateCompanyProfile = (updatedCompany) =>
  API.patch("/company/edit-company", updatedCompany);

export const getCompanyUser = (id) =>
  API.get("/company/profile", {
    params: {
      id,
    },
  });
export const updateCompanyUser = (user) => API.patch("/company/profile", user);

export const sendProposal = (proposal) => API.post("/find-projects", proposal);

export const addCompanyPortfolio = (portfolio) =>
  API.post("/company/add-portfolio", portfolio);

export const getCompanyPortfolios = (id) =>
  API.get("/company/portfolio", {
    params: {
      id,
    },
  });

export const cleintAddProject = (project) =>
  API.post("/client/add-project", project);
export const getClientProjects = (id) =>
  API.get("/client/projects", {
    params: {
      id,
    },
  });

export const closeClientProject = (id) => API.patch("/client/projects", id);

export const getCompanyProposals = (id) =>
  API.get("/company/proposals", {
    params: {
      id,
    },
  });

export const getProposalProject = (projectId) =>
  API.get("/company/proposals", {
    params: {
      projectId,
    },
  });

export const getProjectProposals = (projectId) =>
  API.get("/client/projects", {
    params: {
      projectId,
    },
  });

export const acceptCompanyProposal = (proposalId) =>
  API.patch("/client/:id/proposals", proposalId);

export const getProposalCompany = (proposalId) =>
  API.get("/client/:id/proposals", {
    params: {
      proposalId,
    },
  });

export const markProjectCompleted = (projectId, userId) =>
  API.patch("/company/proposals", projectId, userId);

export const getProjectsToReview = (id) =>
  API.get("/client/reviews", {
    params: {
      id,
    },
  });

export const cleintAddReview = (review) => API.post("/client/reviews", review);

export const getClientReviews = (id) =>
  API.get("/client/view-all-reviews", {
    params: {
      id,
    },
  });

export const getCompanyReviews = (id) =>
  API.get("/company/reviews", {
    params: {
      id,
    },
  });

export const getAllCompanies = () => API.get("/find-companiess");

export const getCurrentCompany = (username) =>
  API.get(`/company-profile/${username}`, {
    params: {
      username,
    },
  });

export const currentCompanyReviews = (username) =>
  API.get(`/company-profile/${username}/reviews`, {
    params: {
      username,
    },
  });

export const deleteCompanyPortfolio = (id) =>
  API.delete("/company/portfolio", {
    params: {
      userId: id.userId,
      portfolioId: id.portfolioId,
    },
  });

export const promoteCompany = (promotion) =>
  API.post("/company/new-promotion", promotion);

export const getCompanyPromotions = (id) =>
  API.get("/company/promotions", {
    params: {
      id,
    },
  });

export const getAllPromotions = () => API.get("/admin/promotions");

export const adminApprovePromotion = (promotion) =>
  API.patch("/admin/promotions", promotion);

export const adminDisapprovePromotion = (promotion) =>
  API.patch("/admin/promotions", promotion);

export const adminClosePromotion = (promotion) =>
  API.patch("/admin/promotions", promotion);

export const contactUs = (message) => API.post("/contact-us", message);

export const getAllMessages = () => API.get("/admin/messages");

export const getSearchedCompanies = (search) =>
  API.get("/find-companies/search", {
    params: search,
  });
