import PositionService from "./PositionService";

export const ACTION_TYPES = {
    GET_PROMOTION: 'display/GET_LISTPOSITION',
};

export let initialState = {
    positions: null,
  };

const PositionReducer = (position = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_PROMOTION:
            return { ...position, positions:payload };
        default:
            return position;
    }
};

export const getPositions = (type) => async (dispatch) => {
    try {
        const res = await PositionService.getListPosition(type);
        dispatch({
            type: ACTION_TYPES.GET_PROMOTION,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default PositionReducer;