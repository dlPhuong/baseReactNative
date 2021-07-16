import { TouchableHighlightBase } from "react-native";
import http from "../../http-common";
import httpAuth from './../../http-commons-auth';

const getData = auth => {
    return httpAuth(auth).get('api/nsd/GetAllLGCN?iLoadBH=all');
};

const getLIstCarBrands = name => {
    return httpAuth("").get('api/DanhMuc/GetAllByMa?sTableName=PBH_XE_HIEU_LKE&sMa='+name+'&sParam=b_hang');
};



const ShopService = {
    getData,
    getLIstCarBrands,
};

export default ShopService;
