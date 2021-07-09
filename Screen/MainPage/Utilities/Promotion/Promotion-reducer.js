import PromotionService from "./PromotionService";

export const ACTION_TYPES = {
    GET_PROMOTION: 'display/GET_PROMOTION',
};

export let initialState = {
    promotions: null,
  };

const PromotionReducer = (promotion = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_PROMOTION:
            return { ...promotion, promotions:payload };
        default:
            return promotion;
    }
};

export const getPromotion = (data) => async (dispatch) => {
    try {
        const res = await PromotionService.getPromotion(data);
        dispatch({
            type: ACTION_TYPES.GET_PROMOTION,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default PromotionReducer;