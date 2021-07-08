import DisplayService from "./LoginService";

export const ACTION_TYPES = {
    GET_TOKEN: 'display/GET_TOKEN',
    ACCOUNT: 'display/ACCOUNT',
};

export let initialState = {
    Token: null,
    Account: null,
  };

const LoginReducer = (display = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_TOKEN:
            return { ...display, Token:payload };
        case ACTION_TYPES.ACCOUNT:
            return { ...display, Account:payload };
        default:
            return display;
    }
};

export const getToken = (data) => async (dispatch) => {
    try {
        const res = await DisplayService.getToken(data);

        dispatch({
            type: ACTION_TYPES.GET_TOKEN,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAccount = (auth) => async (dispatch) => {
    try {
        const res = await DisplayService.getAccountInfo(auth);

        dispatch({
            type: ACTION_TYPES.ACCOUNT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default LoginReducer;