import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../MainPage/homeRoute/home-reducer";
import productDetailReducer, {getProductDetail} from "./ProductDetail-reducer";
import WebView from "react-native-webview";
import MainPage from "../MainPage/Mainpage";

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

    return (
        <View style={{flex: 1}}>
            {productDT ?
                // <WebView
                //     originWhitelist={['*']}
                //     source={{ html: productDT }} />
                <WebView
                    originWhitelist={['*']}
                    source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-size: 25px;"><p>' + productDT + '</p></body></html>'}}
                />
                : null}
               
        </View>
    );
}

const styles = StyleSheet.create({
    textTitile: {
        width: '100%',
        flex: 1,
        marginTop: 18,
        justifyContent: "space-between",
        flexDirection: "row",
    }
});
