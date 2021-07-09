import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text,FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import Header from "../../../component/Header";
export default function Utilities({ navigation }) {
    const dataUtilities = [
        // phần icon lấy ở https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json
        {
            'icon': 'order-alphabetical-ascending',
            'name': 'Đơn hàng'
        }, {
            'icon': 'mailbox',
            'name': 'Tin khuyến mãi'
        }, {
            'icon': 'calendar',
            'name': 'Tin XTI'
        }, {
            'icon': 'microsoft-internet-explorer',
            'name': 'mạng lưới XTI'
        }, {
            'icon': 'clipboard-list',
            'name': 'Danh sách đăng kiểm'
        }, {
            'icon': 'car-settings',
            'name': 'Danh sách Gara'
        }, {
            'icon': 'badminton',
            'name': 'Câu hỏi thường gặp'
        }, {
            'icon': 'badminton',
            'name': 'Điều khoản điều kiện sử dụng'
        }

    ]
    const [Utilitis, setUtilitis] = useState(dataUtilities);
    // render giao diện {item.icon}
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            onPress={() => nextScreen(item.icon) }
            style={styles.itemRender}>
                <MaterialCommunityIcons name={item.icon} color='#0099FF' size={42} />
                <Text style={styles.textContent}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    function nextScreen(navi){
        switch(navi) {
            case 'mailbox': 
            navigation.navigate('promotion')
              break;
            case 'folder-key':
                console.log("hihi laf tows ne");
              break;
            default:
              // code block
          }
    }

    return (
        <View style={{position: 'absolute',flex: 1, left: 0, right: 0, top: 0}}>
        <Header header={"Sản phẩm"} />
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Utilitis}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
            />
        </SafeAreaView>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:40,
        justifyContent: "flex-start",
    },
     textContent: {
        fontWeight:"bold",
        textAlignVertical:"center",
        marginLeft:10,
    },
    itemRender: {
        flexDirection: "row",
        marginVertical: 10,
        marginLeft:10,
    }

});
