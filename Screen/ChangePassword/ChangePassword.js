import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Pressable, Dimensions, StyleSheet } from "react-native";
import Button from "../../component/Button";
import Header from "../../component/Header";
import TextInput from "../../component/TextInput";
import { theme } from "../../core/theme";
import { useDispatch ,useSelector} from "react-redux";
import { decode as atob, encode as btoa } from 'base-64'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderActivity from "../../component/HeaderActivity";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { acc } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
var axios = require('axios');

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function ChangePassword({ navigation }) {

    const [account, setAccount] = useState({ value: '', error: '' });
    const [oldPass, setoldPass] = useState({ value: '', error: '' });
    const [pass, setPass] = useState({ value: '', error: '' });
    const [rePass, setRepass] = useState({ value: '', error: '' });

    const [hidePassOld, setHidePassOld] = useState(true);
    const [hidePass, setHidePass] = useState(true);
    const [hiderePass, setHiderePass] = useState(true);

    const dispatch = useDispatch();
    const logins = useSelector(state => state.login);
    function handleBack() {
        navigation.goBack();
    }

    function changePass() {
        let data = JSON.stringify({
            "NSD": account.value,
            "OldPass": oldPass.value,
            "NewPass": pass.value,
            "RePass": rePass.value
        });

        let config = {
            method: 'post',
            url: 'https://sandbox.xti.vn/api/Customer/ResetPassword',
            headers: {
                'Authorization': 'bearer '+logins.Token.access_token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                Alert.alert("đổi mật khẩu thành công! ");
                navigation.navigate('login');
            })
            .catch(function (error) {
                Alert.alert(""+error.response.data);
            });

    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5, backgroundColor: theme.colors.error }}>
                <HeaderActivity header={"Đổi mật khẩu"} goback={handleBack} />
            </View>

            <View style={{ flex: 9, marginHorizontal: 10, marginTop: 10 }}>

                <Input
                    style={{ height: 40 }}
                    value={account.value}
                    label="Tài khoản"
                    onChangeText={text => setAccount({ value: text, error: '' })}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 40 }}
                    value={account}
                    label="Mật khẩu cũ"
                    secureTextEntry={hidePassOld ? true : false}
                    onChangeText={text => setoldPass({ value: text, error: '' })}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Icon
                            onPress={() => setHidePassOld(!hidePassOld)}
                            name={hidePassOld ? 'eye-slash' : 'eye'}
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 40 }}
                    value={account}
                    label="Mật khẩu mới "
                    secureTextEntry={hidePass ? true : false}
                    onChangeText={text => setPass({ value: text, error: '' })}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Icon
                            onPress={() => setHidePass(!hidePass)}
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 40 }}
                    value={account}
                    keyboardType="password"
                    label="Nhập lại mật khẩu"
                    secureTextEntry={hiderePass ? true : false}
                    onChangeText={text => setRepass({ value: text, error: '' })}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                    rightIcon={
                        <Icon
                            onPress={() => setHiderePass(!hiderePass)}
                            name={hiderePass ? 'eye-slash' : 'eye'}
                            size={24}
                            color='black'
                        />
                    }
                />

                <Pressable
                    style={styles.button}
                 onPress={() => changePass()}
                >
                    <Text style={{ textAlign: "center", color: theme.colors.white, fontWeight: "bold" }}>Đồng ý</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    }, button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
        elevation: 2,
        backgroundColor: theme.colors.primary
    }
});

