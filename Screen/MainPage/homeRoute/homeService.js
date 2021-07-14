import httpAuth from "../../../http-commons-auth";


const getProduct = data => {
     return httpAuth("").post('api/product/SearchSanPham',data);
};

const getNotifi = auth => {
    return httpAuth(auth).get('api/NsdLog/GetAll?loai=Tin_TUC&nghiepvu=');
};

const HomeService = {
    getProduct,
    getNotifi,
};

export default HomeService;
