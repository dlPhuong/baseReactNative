import httpAuth from "../../../../http-commons-auth";


const getPromotion = data => {
     return httpAuth("").post('api/TinTuc/SearchTinTuc',data);
};

const PromotionService = {
    getPromotion,
};

export default PromotionService;
