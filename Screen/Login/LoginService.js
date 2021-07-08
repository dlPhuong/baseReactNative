import { TouchableHighlightBase } from "react-native";
import http from "../../http-common";
import httpAuth from './../../http-commons-auth';



const getToken = data => {
     return http.post('/oauth2/token',data);
};

const getAccountInfo = auth => {
    return httpAuth(auth).get('api/user/GetMyProfile?url=api/NsdLog/GetAll?loai=TIN_TUC&nghiepvu=');
};

const DisplayService = {
    getToken,
    getAccountInfo,
};

export default DisplayService;
