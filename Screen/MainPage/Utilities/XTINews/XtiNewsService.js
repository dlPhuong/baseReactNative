import httpAuth from "../../../../http-commons-auth";


const getXtinews = () => {
     return httpAuth("").get('api/DashBoard/GetToDashBoard');
};

const xtinewsService = {
    getXtinews,
};

export default xtinewsService;
