import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet,Modal, Image, TouchableOpacity } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import HeaderActivity from "../../../../component/HeaderActivity";

import { Switch,TextInput  } from 'react-native-paper';
import { getXtiNews } from "./XtiNews-reducer";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../../core/theme";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";

export default function XtiNews({ navigation }) {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [news, setNews] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
          dispatch(getXtiNews())
            .then(data => {
              if (data != null) {
                console.log(data);
                setNews(data);
              }
            })
            .catch(e => {
               console.log(e);
            });
        
      }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemRender}
                onPress={() => navigation.navigate('XtiNewDetail',{item})}
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
                <HeaderActivity header={"Tin XTI"} goback={handleClick} />
            </View>

            <View style={{flex:16}}>
            <FlatList
                    data={news ? news.ShowLstTinTuc : null}
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
        color: theme.colors.primary,
        fontSize:18,
      },
    itemRender: {
        flexDirection: "column",
        flex:1,
        paddingVertical:10,
       
    }
});
