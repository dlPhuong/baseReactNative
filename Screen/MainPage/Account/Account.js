import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet,Modal, Image, TouchableOpacity } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import Header from "../../../component/Header";
import DialogPassword from "../../../component/DialogPassword";
import { Switch,TextInput  } from 'react-native-paper';
export default function Account({ navigation }) {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [secure, setSecure] = React.useState(true);
    const dataUtilities = [
        // phần icon lấy ở https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json
        {
            'icon': 'account',
            'name': 'Thông tin cá nhân'
        }, {
            'icon': 'fingerprint',
            'name': 'Đăng nhập sinh trắc'
        }, {
            'icon': 'folder-key',
            'name': 'Đổi mật khẩu'
        }, {
            'icon': 'logout',
            'name': 'Đăng xuất'
        }

    ]

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        setModalVisible(!isSwitchOn);
    }

    const [Utilitis, setUtilitis] = useState(dataUtilities);
    // render giao diện {item.icon}

    function nextScreen(navi){
        switch(navi) {
            case 'account': 
            navigation.navigate('accountDetail')
              break;
            case 'folder-key':
                console.log("hihi laf tows ne");
              break;
            default:
              // code block
          }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
            onPress={() => nextScreen(item.icon) }
            style={styles.itemRender}>
                <MaterialCommunityIcons name={item.icon} color='#0099FF' size={42} />
                <Text style={styles.textContent}>{item.name}</Text>
                {item.name == 'Đăng nhập sinh trắc' ?
                    <Switch style={{ alignItems: "flex-end" }} value={isSwitchOn} onValueChange={onToggleSwitch} />
                    : null}
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ position: 'absolute', flex: 1, left: 0, right: 0, top: 0 }}>
            <Header header={"Sản phẩm"} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={Utilitis}
                    renderItem={renderItem}
                    keyExtractor={item => item.Id}
                />
            </SafeAreaView>

            <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                            <TextInput
                            style={{height:50,width:200}}
                                label="Password"
                                secureTextEntry={secure}
                                secure={true}
                                right={<TextInput.Icon onPress={() => setSecure(!secure)} name={secure ? "eye" : 'eye-slash'} />}
                            />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>xác nhận mật khẩu</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        justifyContent: "flex-start",
    },
    textContent: {
        fontWeight: "bold",
        textAlignVertical: "center",
        marginLeft: 10,
    },
    itemRender: {
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: 10,
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginTop:10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});
