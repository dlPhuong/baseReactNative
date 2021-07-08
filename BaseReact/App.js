import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from "react-native";
import Login from './Screen/Login/Login';
import MainPage from './Screen/MainPage/Mainpage';
import Header from "../BaseReact/component/Header";
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="mainpage" component={MainPage} />
          <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
