import httpAuth from "../../../http-commons-auth";


const getProduct = data => {
     return httpAuth("").post('api/product/SearchSanPham',data);
};

const HomeService = {
    getProduct,
};

export default HomeService;
