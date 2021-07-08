import ProductDetailService from "./ProductDetailService";


export const ACTION_TYPES = {
    GET_PRODUCT_DETAIL: 'display/GET_PRODUCT_DETAIL',
};

export let initialState = {
    productDetail: null,
  };

const productDetailReducer = (productDetail = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPES.GET_PRODUCT_DETAIL:
            return { ...productDetail, productDetail:payload };
        default:
            return productDetail;
    }
};

export const getProductDetail = (id) => async (dispatch) => {
    try {
        const res = await ProductDetailService.getProductDetail(id);

        dispatch({
            type: ACTION_TYPES.GET_PRODUCT_DETAIL,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default productDetailReducer;
