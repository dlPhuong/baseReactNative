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
export default function ResetPasswordScreen({ navigation }) {

    const [account, setAccount] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [capcha, setCapcha] = useState('');

    const dispatch = useDispatch();

    function handleBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5, backgroundColor: theme.colors.error }}>
                <HeaderActivity header={"Lấy lại mật khẩu"} goback={handleBack} />
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
                    label="Số điện thoại"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    leftIcon={
                        <Icon
                            name='phone'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 40 }}
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    leftIcon={
                        <Icon
                            name='envelope-open'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    style={{ height: 40 }}
                    value={capcha}
                    label={'capcha'}
                    onChangeText={text => setCapcha(text)}
                    leftIcon={
                        <Icon
                            name='snapchat-ghost'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Pressable
                    style={styles.button}
                // onPress={() => checkAccount()}
                >
                    <Text style={{ textAlign: "center", color: theme.colors.white, fontWeight: "bold" }}>xác nhận mật khẩu</Text>
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

