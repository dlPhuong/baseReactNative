import React from "react";
import { View, Pressable, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import HomeRoute from "./homeRoute/HomeRoute";
import ProductRoute from "./Product/ProductRoute";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Utilities from "./Utilities/Utilities";
import Account from "./Account/Account";
import { theme } from "../../core/theme";
const Tab = createBottomTabNavigator();

export default function MainPage({ navigation }) {

  const logins = useSelector(state => state.login);
  // console.log(logins);

  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: theme.colors.primary }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoute}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          // tabBarBadge: 3
        }}
      />

      <Tab.Screen
        name="product"
        component={ProductRoute}
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-cancel-outline" color={color} size={size} />
          ),
          // tabBarBadge: 3
        }}
      />

      <Tab.Screen
        name="Utilities"
        component={Utilities}
        options={{
          tabBarLabel: 'Tiện ích',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cast-connected" color={color} size={size} />
          ),
          // tabBarBadge: 3
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          // tabBarBadge: 3
        }}
      />

    </Tab.Navigator>
  );
}
