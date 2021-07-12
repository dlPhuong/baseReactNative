import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet,Modal, Image, TouchableOpacity } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import HeaderActivity from "../../../../component/HeaderActivity";

import { Switch,TextInput  } from 'react-native-paper';
import { getPromotion } from "./Promotion-reducer";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../../core/theme";
import WebView from "react-native-webview";

export default function XtiNewDetail({route, navigation }) {

    const {item} = route.params;

    console.log(item);

    function handleClick() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <View style={{flex: 1}}>
                <HeaderActivity header={"nội dung"} goback={handleClick} />
            </View>

            <View style={{ flex: 16 }}>
                {item ?
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-size: 25px;"><p>' + item.NoiDung + '</p></body></html>' }}
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
    },  
    tinyLogo: {
        flex:1,
        borderRadius:10,
        width:windowWidth,
        height: windowHeight*0.3,
      }, 
       textTitle: {
        flex:1,
        textAlign:"center",
        paddingHorizontal:10,
      },
    itemRender: {
        flexDirection: "column",
        flex:1,
        paddingVertical:10,
       
    }
});
