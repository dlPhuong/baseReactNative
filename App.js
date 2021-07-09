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

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="mainpage" component={MainPage}/>
                    <Stack.Screen name="login" component={Login} options={{title: 'Login'}}/>
                    <Stack.Screen name="promotion" component={Promotion}/>
                    <Stack.Screen name="promotionDetail" component={PromotionDetail}/>
                    <Stack.Screen name="productDetail" component={ProductDetail}/>
                    <Stack.Screen name="accountDetail" component={AccountDetail}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
