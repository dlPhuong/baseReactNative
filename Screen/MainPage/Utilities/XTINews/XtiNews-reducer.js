import xtiNewService from "./XtiNewsService";

export const ACTION_TYPES = {
    GET_NEWS: 'display/GET_NEWS',
};

export let initialState = {
    newsxti: null,
  };

const XtiNewReducer = (newxti = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_NEWS:
            return { ...newxti, newsxti:payload };
        default:
            return newxti;
    }
};

export const getXtiNews = () => async (dispatch) => {
    try {
        
        const res = await xtiNewService.getXtinews();
        console.log("here");
        dispatch({
            type: ACTION_TYPES.GET_NEWS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default XtiNewReducer;