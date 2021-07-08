import { combineReducers } from "redux";
import LoginReducer from "./Screen/Login/Login-reducer";
import HomeReducer from "./Screen/MainPage/homeRoute/home-reducer";
import productDetailReducer from "./Screen/ProductDetail/ProductDetail-reducer";
export default combineReducers({
    login:LoginReducer,
    product:HomeReducer,
    productDetail:productDetailReducer,
});
