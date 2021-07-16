import ShopService from "./shopService";


export const ACTION_TYPES = {
    GET_DATA: 'display/GET_DATA',
    GET_CAR: 'display/GET_CAR',
};

export let initialState = {
    ShopDatas: null,
    dataCar: null,
  };

const ShopReducer = (shopData = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_DATA:
            return { ...shopData, ShopDatas:payload };
            break;
            case ACTION_TYPES.GET_CAR:
                return { ...shopData, dataCar:payload };
                break;
        default:
            return shopData;
    }
};

export const getdata = (auth) => async (dispatch) => {
    try {
        const res = await ShopService.getData(auth);

        dispatch({
            type: ACTION_TYPES.GET_DATA,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};


export const getCarBrands = (name) => async (dispatch) => {
    try {
        const res = await ShopService.getLIstCarBrands(name);

        dispatch({
            type: ACTION_TYPES.GET_CAR,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default ShopReducer;
