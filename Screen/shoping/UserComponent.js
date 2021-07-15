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
export default function UserComponent() {
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



    function updateIndex(selected) {
        setselectedIndex(selected);
    }
    function switch1() {
        setisSwitch(!isSwitch);
    }

    function renderLabel(label) {
        return (
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: 'bold' }}>{label + " "}</Text>
                <Text style={{ color: theme.colors.error }}>*</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Icon
                    name="user"
                    size={24}
                    color="#5AE5F5"
                />
                <Text style={styles.titleStyle}>Người mua BH</Text>
            </View>

            <SafeAreaView style={{ alignItems: "center" }} >
                <ButtonGroup
                    onPress={updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 40, width: 200, borderRadius: 5, }}
                />
            </SafeAreaView>

            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Switch value={isSwitch} onChange={switch1} />
                <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: 'bold' }}> Người mua bảo hiểm khác chủ xe</Text>
            </SafeAreaView>

            <SafeAreaView style={{ marginTop: 10, flexDirection: 'column', alignItems: 'center' }}>
                <Input
                    value={name.value}
                    label={renderLabel(isSwitch?"tên":"Tên chủ xe theo DK")}
                    onChangeText={text => setName({ value: text, error: '' })}
                    errorMessage={account.error}
                />

                <Input
                    value={phone.value}
                    label={renderLabel("Điện thoại")}
                    onChangeText={text => setPhone({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={identity.value}
                    label={renderLabel( selectedIndex==0?"CCCD/Hộ chiếu":"Mã số thuế")}
                    onChangeText={text => setIdentity({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={email.value}
                    label={renderLabel("Email")}
                    onChangeText={text => setEmail({ value: text, error: '' })}
                    errorMessage={account.error}
                />
                <Input
                    value={address.value}
                    label={renderLabel( isSwitch?"Địa chỉ":"Địa chỉ theo DK")}
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
    }
});
