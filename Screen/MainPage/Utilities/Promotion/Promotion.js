import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet,Modal, Image, TouchableOpacity } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import HeaderActivity from "../../../../component/HeaderActivity";

import { Switch,TextInput  } from 'react-native-paper';
import { getPromotion } from "./Promotion-reducer";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../../core/theme";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
export default function Promotion({ navigation }) {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [promotions, setPromotions] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
          let dataraw = { "IdSoCM": 20200507046338, "Ten": "", "Tu": 1, "Den": 12 };
          dispatch(getPromotion(dataraw))
            .then(data => {
              if (data != null) {
                console.log(data);
                setPromotions(data);
              }
            })
            .catch(e => {
              // console.log(e);
            });
        
      }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemRender}
                onPress={() => navigation.navigate('promotionDetail',{item})}
                >
                <Image
                    resizeMode="contain"
                    style={styles.tinyLogo}
                    source={{
                        uri: item.ImageTDe,
                    }}
                />
                <Text style={styles.textTitle} >
                    {item.TieuDe}
                </Text>
                <View
                    style={{
                        borderBottomColor: theme.colors.primary,
                        borderBottomWidth: 1,
                    }}
                />
            </TouchableOpacity>
        );
    }


    function handleClick() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <View style={{flex: 1}}>
                <HeaderActivity header={"Tin khuyến mãi"} goback={handleClick} />
            </View>

            <View style={{flex:16}}>
            <FlatList
                    data={promotions ? promotions.Items : null}
                    renderItem={renderItem}
                    keyExtractor={item => item.Id}
                />
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
        fontWeight:"bold",
        color:theme.colors.primary,
        fontSize:18
      },
    itemRender: {
        flexDirection: "column",
        flex:1,
        paddingVertical:10,
       
    }
});
