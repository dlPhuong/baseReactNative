import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Pressable, Dimensions, StyleSheet } from "react-native";
import Button from "../../component/Button";
import Header from "../../component/Header";
import TextInput from "../../component/TextInput";
import { theme } from "../../core/theme";
import { useDispatch } from "react-redux";
import { decode as atob, encode as btoa } from 'base-64'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderActivity from "../../component/HeaderActivity";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { acc } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function ChangePassword({ navigation }) {

    const [account, setAccount] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [hiderePass, setHiderePass] = useState(true);

    const dispatch = useDispatch();

    function handleBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5, backgroundColor: theme.colors.error }}>
                <HeaderActivity header={"Đổi mật khẩu"} goback={handleBack} />
            </View>

            <View style={{ flex: 9, marginHorizontal: 10, marginTop: 10 }}>

                <Input
                    style={{ height: 40 }}
                    value={account}
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
                    style={{ height: 40 }}
                    value={account}
                    label="Mật khẩu"
                    secureTextEntry={hidePass ? true : false}
                    onChangeText={text => setAccount(text)}
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
                    onChangeText={text => setAccount(text)}
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
                // onPress={() => checkAccount()}
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

