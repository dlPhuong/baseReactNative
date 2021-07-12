import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Modal, Image, TouchableOpacity, Linking, Platform } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import HeaderActivity from "../../../../component/HeaderActivity";

import { getPositions } from "./Position-reducer";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../../core/theme";
import TextInput from "../../../../component/TextInput";

export default function ListPosition({ route, navigation }) {
    const item = route.params.navi;

    const [positions, setPositions] = React.useState(null);
    const [searchText, setsearchText] = React.useState('');
    const [filteredData, setfilteredData] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let type = "";
        switch (item.icon) {
            case 'microsoft-internet-explorer': type = "DV"
                break;
            case 'clipboard-list':
                type = "DK"
                break;
            case 'car-settings':
                type = "GR"
                break;
        }

        dispatch(getPositions(type))
            .then(data => {
                if (data != null) {
                    // console.log(data);
                    setPositions(data);
                }
            })
            .catch(e => {
                // console.log(e);
            });

    }, []);

    function handleClick() {
        navigation.goBack();
    }

    const search = (text) => {
        setsearchText(text)
        let filteredData = positions.filter(function (value) {
            return value.Ten.toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setfilteredData(filteredData);
    };

    const openGoogleMap=(item)=>{
        console.log(item.DiaChi);
        if(Platform.OS === 'ios'){
            Linking.openURL('http://maps.apple.com/maps?daddr='+item.DiaChi);
        }
        if(Platform.OS === 'android'){
            Linking.openURL('http://maps.google.com/maps?daddr='+item.DiaChi);
        }
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                 onPress={()=>openGoogleMap(item)}
                style={styles.itemRender}>
                <Text style={styles.textName}>{item.Ten}</Text>

                <View style={styles.item1Render}>
                    <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
                    <Text>{item.DiaChi}</Text>
                </View>

                <View style={styles.item1Render}>
                    <Text style={{ fontWeight: "bold" }}>SĐT/Fax: </Text>
                    <Text>{item.DienThoai}</Text>

                </View>

                <View
                    style={{
                        borderBottomColor: theme.colors.primary,
                        borderBottomWidth: 1,
                    }}
                />

            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <HeaderActivity header={item.name} goback={handleClick} />
            </View>

            <View style={{ flex: 2,marginTop:10 }}>
                <TextInput
                    style={styles.InputSearch}
                    label="Tìm kiếm"
                    value={searchText}
                    onChangeText={(text) => search(text)}
                />
            </View>

            <View style={{ flex: 18,marginTop:10 }}>
                <FlatList
                    data={filteredData && filteredData.length > 0 ? filteredData : positions}
                    renderItem={renderItem}
                    keyExtractor={item => item.Ma}
                    scrollEnabled={true}
                />
            </View>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    },
    InputSearch: {
        paddingHorizontal: 20,
        height: 40,
    },
    itemRender: {
        flexDirection: "column",
        flex: 1,
    },
    item1Render: {
        flexDirection: "row",
        flex: 1,
        marginVertical: 5,
    },
    textName: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
        marginVertical: 5,
    }
});
