import httpAuth from "../../../../http-commons-auth";


const getListPosition = type => {
     return httpAuth("").get('api/nsd/GetAllDonViUser?sMaDVi=000&sKieu=&sLoai='+type+'&sTim=');
};

const PositionService = {
    getListPosition,
};

export default PositionService;
