import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WebView from "react-native-webview";
import { Button } from 'react-native-elements';
import HeaderActivity from '../../component/HeaderActivity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
import { Switch } from 'react-native-elements';
import { Input, ButtonGroup } from 'react-native-elements';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function BillComponent() {
    const logins = useSelector(state => state.login);
    console.log(logins);
    const buttons = ['cá nhân', 'tổ chức']
    const [selectedIndex, setselectedIndex] = useState(0);

    const [isSwitch, setisSwitch] = useState(false);

    const [account, setAccount] = useState({ value: '', error: '' });

    const [name, setName] = useState({ value: logins.Account.Ten, error: '' });
    const [phone, setPhone] = useState({ value: logins.Account.Mobile, error: '' });
    const [identity, setIdentity] = useState({ value: logins.Account.CCMS, error: '' });
    const [email, setEmail] = useState({ value: logins.Account.Email, error: '' });
    const [address, setAddress] = useState({ value: logins.Account.DiaChi, error: '' });

    function renderLabel(label) {
        return (
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: 'bold',color:theme.colors.primary }}>{label + " "}</Text>
            
            </View>
        );
    }

    return (
        <View>
            <SafeAreaView style={{ marginTop: 10, flexDirection: 'column', alignItems: 'center' }}>

                <SafeAreaView style={styles.containerRow}>
                    {/* check confidition here */}
                    <Text style={{ fontWeight: 'bold',fontSize:18, color: theme.colors.primary }}> Thông tin người nhận hóa đơn</Text>
                </SafeAreaView>

                <Input
                    value={name.value}
                    label={renderLabel('Người nhận hóa đơn')}
                    onChangeText={text => setName({ value: text, error: '' })}
                    errorMessage={account.error}
                />

                <Input
                    value={phone.value}
                    label={renderLabel('Địa chỉ')}
                    onChangeText={text => setPhone({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={identity.value}
                    label={renderLabel('Mã số thuế')}
                    onChangeText={text => setIdentity({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={email.value}
                    label={renderLabel('Điện thoại')}
                    onChangeText={text => setEmail({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={address.value}
                    label={renderLabel('Email')}
                    onChangeText={text => setAddress({ value: text, error: '' })}
                    errorMessage={account.error}
                />
            </SafeAreaView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.primary,
        marginLeft: 10,
    },containerRow: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal:5,
        marginVertical:5,
    },
});
