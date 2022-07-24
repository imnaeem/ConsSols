import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./reducers/companies";
import authReducer from "./reducers/auth";
import companyProfileReducer from "./reducers/companyProfile";
import UserProfileReducer from "./reducers/userProfile";
import companyPortfolioReducer from "./reducers/companyPortfolio";
import clientProjectReducer from "./reducers/clientProject";
import projectsReducer from "./reducers/projects";
import companyProposalsReducer from "./reducers/companyProposals";
import projectProposalsReducer from "./reducers/projectProposals";
import reviewProjectsReducer from "./reducers/reviewProjects";
import allClientsProjectsReducer from "./reducers/allClientProjects";
import allReviewsReducer from "./reducers/allReviews";
import checkCompanyProfileReducer from "./reducers/checkCompanyProfile";
import companyPromotionReducer from "./reducers/companyPromotion";
import adminPromotionsReducer from "./reducers/adminPromotions";
import contactUsMessagesReducer from "./reducers/contactus";

const store = configureStore({
  reducer: {
    companies: companiesReducer,
    auth: authReducer,
    companyProfile: companyProfileReducer,
    userProfile: UserProfileReducer,
    companyPortfolio: companyPortfolioReducer,
    clientProjects: clientProjectReducer,
    projects: projectsReducer,
    companyProposals: companyProposalsReducer,
    projectProposals: projectProposalsReducer,
    reviewProjects: reviewProjectsReducer,
    allClientsProjects: allClientsProjectsReducer,
    allReviews: allReviewsReducer,
    checkCompanyProfile: checkCompanyProfileReducer,
    companyPromotions: companyPromotionReducer,
    adminPromotions: adminPromotionsReducer,
    contactUsMessages: contactUsMessagesReducer,
  },
});

export default store;
