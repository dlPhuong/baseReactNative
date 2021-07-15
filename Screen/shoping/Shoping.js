import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WebView from "react-native-webview";
import { Button } from 'react-native-elements';
import HeaderActivity from '../../component/HeaderActivity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
import UserComponent from './UserComponent';
import CarInfoComponent from './CarInfoComponent';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function Shoping({ route, navigation }) {
    const { item } = route.params;
    console.log(item);
    const data = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [productDT, setproductDT] = useState(null);

    function handleClick() {
        navigation.goBack();
    }

    return (
        <View style={{flex:1}}>
            <View style={{ flex: 1,maxHeight:40 }}>
                <HeaderActivity header={item.Ten} goback={handleClick} />
            </View>
            <ScrollView style={styles.container}>
            <UserComponent />
            <CarInfoComponent />
            </ScrollView>

        <SafeAreaView style={styles.forgotPassword}>

        <TouchableOpacity>
          <Text style={styles.forgot}>tổngtiền:</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{backgroundColor:theme.colors.primary,margin:5}}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.forgot1}>Thanh Toán</Text>
        </TouchableOpacity>

        </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal:5,
    },
    forgotPassword: {
        width: '100%',
        flex: 1,
        maxHeight: 50,
        justifyContent: "space-between",
        flexDirection: "row",
      },
      forgot: {
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        textAlignVertical: 'center',
        color: theme.colors.secondary,
      },
      forgot1: {
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        textAlignVertical: 'center',
        color: theme.colors.white,
      },
});
