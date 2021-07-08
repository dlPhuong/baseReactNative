import httpAuth from "../../http-commons-auth";


const getProductDetail = id => {
     return httpAuth("").get('api/product/GetByPrimaryKeyCT?productId='+id);
};

const ProductDetailService = {
    getProductDetail,
};

export default ProductDetailService;
