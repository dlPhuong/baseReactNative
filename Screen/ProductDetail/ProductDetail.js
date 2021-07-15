import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../MainPage/homeRoute/home-reducer";
import productDetailReducer, { getProductDetail } from "./ProductDetail-reducer";
import WebView from "react-native-webview";
import MainPage from "../MainPage/Mainpage";
import { Button } from 'react-native-elements';
import HeaderActivity from '../../component/HeaderActivity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function ProductDetail({ route, navigation }) {
    const { item } = route.params;
    console.log(item);
    const data = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [productDT, setproductDT] = useState(null);


    useEffect(() => {
        dispatch(getProductDetail(item.Id))
            .then(data => {
                if (data != null) {
                    console.log(data.ProductShow.GioiThieu);
                    setproductDT(data.ProductShow.GioiThieu);
                }
            })
            .catch(e => {
                // console.log(e);
            });
    }, []);

    function handleClick() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <HeaderActivity header={item.Ten} goback={handleClick} />
            </View>

            <View style={{ flex: 16 }}>
                {productDT ?
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-size: 14px;"><p>' + productDT + '</p></body></html>' }}
                    />
                    : null}
            </View>
            <SafeAreaView style={{backgroundColor: theme.colors.white}}>
    
                <Button
                onPress={()=> navigation.navigate('Shoping',{item})}
                 type="outline"
                    icon={
                        <Icon
                            name="shopping-cart"
                            size={20}
                            color="#5AE5F5"
                        />
                    }
                    title=" Mua ngay"
                    
                />
            </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    }
});
