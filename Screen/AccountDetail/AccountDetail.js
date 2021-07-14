import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Dimensions, StyleSheet } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import Header from "../../component/Header";
import { Button, Switch, TextInput } from 'react-native-paper';
import { theme } from "../../core/theme";
import { useDispatch, useSelector } from "react-redux";
import HeaderActivity from "../../component/HeaderActivity";
import BackButton from "../../component/BackButton";
import { Input, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function AccountDetail({ navigation }) {

    const logins = useSelector(state => state.login);

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    function handleClick() {
        navigation.goBack();
    }
    useEffect(() => {
        if (logins.Token == null) {
            navigation.navigate('login');
        } else {
            console.log(logins);
        }
    }, []);
    // render giao diện {item.icon}
    return (
        <View style={{ flex: 1 }}>
            <HeaderActivity header={"Tài khoản"} goback={handleClick} />
            <View style={styles.container}>

                <Input
                    style={{ height: 30 }}
                    value={logins.Account ? logins.Account.Ma : ""}
                    label="Tài khoản"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 30 }}
                    value={logins.Account ? logins.Account.Ten : ""}
                    label="Tên"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 30 }}
                    value={logins.Account ? logins.Account.Mobile : ""}
                    label="Điện thoại"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 30 }}
                    value={logins.Account ? logins.Account.Mobile : ""}
                    label="CMT/CCCD"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 30 }}
                    value={logins.Account ? logins.Account.Email : ""}
                    label="EMAIL"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 30}}
                    value={logins.Account ? logins.Account.DiaChi : ""}
                    label="Địa chỉ"
                    onChangeText={text => setAccount(text)}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
                <View style={{ width: windowWidth * 0.7, marginTop: 20 }}>
                    <Button mode="contained" >
                        Cập nhật tài khoản
                    </Button>
                </View>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: theme.colors.notification,
        fontWeight: "bold",
    },
    inputstyle: {
        width: windowWidth,
        marginVertical: 1,
    },
});
