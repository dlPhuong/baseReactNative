import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from "react-native";
import Login from './Screen/Login/Login';
import MainPage from './Screen/MainPage/Mainpage';
import Header from "../baseReactNative/component/Header";
import {Provider} from 'react-redux';
import store from './store';
import ProductDetail from "./Screen/ProductDetail/ProductDetail";
import AccountDetail from './Screen/AccountDetail/AccountDetail';
import Promotion from './Screen/MainPage/Utilities/Promotion/Promotion';
import PromotionDetail from './Screen/MainPage/Utilities/Promotion/PromotionDetail';
import XtiNews from './Screen/MainPage/Utilities/XTINews/XtiNews';
import XtiNewDetail from './Screen/MainPage/Utilities/XTINews/XtiNewDetail';
import ListPosition from './Screen/MainPage/Utilities/ListPosition/ListPosition';
import ResetPasswordScreen from './Screen/ResetPassword/ResetPassword';
import Register from './Screen/Register/Register';
import ChangePassword from './Screen/ChangePassword/ChangePassword';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="login" component={Login} options={{title: 'Login'}}/>
                    <Stack.Screen name="mainpage" component={MainPage}/>
                    <Stack.Screen name="promotion" component={Promotion}/>
                    <Stack.Screen name="promotionDetail" component={PromotionDetail}/>
                    <Stack.Screen name="productDetail" component={ProductDetail}/>
                    <Stack.Screen name="accountDetail" component={AccountDetail}/>

                    <Stack.Screen name="xtiNews" component={XtiNews}/>
                    <Stack.Screen name="XtiNewDetail" component={XtiNewDetail}/>

                    <Stack.Screen name="ListPosition" component={ListPosition}/>
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                    

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
