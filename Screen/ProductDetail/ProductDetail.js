import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../MainPage/homeRoute/home-reducer";
import productDetailReducer, {getProductDetail} from "./ProductDetail-reducer";
import WebView from "react-native-webview";
import MainPage from "../MainPage/Mainpage";
import HeaderActivity from '../../component/HeaderActivity';

const {width: windowWidth, height: windowHeight} = Dimensions.get("window");

export default function ProductDetail({route, navigation}) {
    const {item} = route.params;
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
                <HeaderActivity header={"Thông tin bảo hiểm"} goback={handleClick} />
            </View>
            <View style={{ flex: 16 }}>
            {productDT ?
                <WebView
                    originWhitelist={['*']}
                    source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-size: 14px;"><p>' + productDT + '</p></body></html>' }}
                />
                : null}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
container: {
        flex: 1,
        justifyContent: "center",
        flexDirection:"column"
    }
});
