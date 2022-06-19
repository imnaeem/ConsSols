import * as api from "../api";
export const getAllPromotions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPromotions();

    dispatch({ type: "ALL_ADMIN_PROMOTIONS", payload: data });
  } catch (error) {
    return error;
  }
};

export const adminApprovePromotion = (promotion) => async (dispatch) => {
  try {
    const { data } = await api.adminApprovePromotion(promotion);

    dispatch({ type: "APPROVE_PROMOTION", payload: data });
  } catch (error) {
    return error;
  }
};

export const adminClosePromotion = (promotion) => async (dispatch) => {
  try {
    const { data } = await api.adminClosePromotion(promotion);

    dispatch({ type: "CLOSE_PROMOTION", payload: data });
  } catch (error) {
    return error;
  }
};
export const adminDisapprovePromotion = (promotion) => async (dispatch) => {
  try {
    const { data } = await api.adminDisapprovePromotion(promotion);

    dispatch({ type: "DISAPPROVE_PROMOTION", payload: data });
  } catch (error) {
    return error;
  }
};

export const getAllMessages = () => async (dispatch) => {
  try {
    const { data } = await api.getAllMessages();
    dispatch({ type: "GET_ALL_MESSAGES", payload: data });
  } catch (error) {
    return error;
  }
};
