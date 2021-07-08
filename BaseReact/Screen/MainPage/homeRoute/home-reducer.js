import HomeService from "./homeService";

export const ACTION_TYPES = {
    GET_PRODUCT: 'display/GET_PRODUCT',
};

export let initialState = {
    products: null,
  };

const ProductReducer = (product = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_PRODUCT:
            return { ...product, products:payload };
        default:
            return product;
    }
};

export const getProduct = (data) => async (dispatch) => {
    try {
        const res = await HomeService.getProduct(data);

        dispatch({
            type: ACTION_TYPES.GET_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default ProductReducer;