import { combineReducers } from "redux";
import LoginReducer from "./Screen/Login/Login-reducer";
import HomeReducer from "./Screen/MainPage/homeRoute/home-reducer";
import PositionReducer from "./Screen/MainPage/Utilities/ListPosition/Position-reducer";
import PromotionReducer from "./Screen/MainPage/Utilities/Promotion/Promotion-reducer";
import XtiNewReducer from "./Screen/MainPage/Utilities/XTINews/XtiNews-reducer";
import productDetailReducer from "./Screen/ProductDetail/ProductDetail-reducer";
export default combineReducers({
    login:LoginReducer,
    product:HomeReducer,
    productDetail:productDetailReducer,
    promotion:PromotionReducer,
    news:XtiNewReducer,
    position:PositionReducer,
});
