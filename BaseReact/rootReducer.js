import { combineReducers } from "redux";
import LoginReducer from "./Screen/Login/Login-reducer";
import HomeReducer from "./Screen/MainPage/homeRoute/home-reducer";
export default combineReducers({
    login:LoginReducer,
    product:HomeReducer,
});