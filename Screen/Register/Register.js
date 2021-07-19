import React, { useState,useEffect } from "react";
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
import { Input, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { nameValidator } from "../../Utils/nameValidator";
import { identityValid } from "../../Utils/identityValid";
import { email1Valid } from "../../Utils/email1Valid";
import { passwordValidator } from "../../Utils/passwordValidator";
import { capchaValid } from "../../Utils/capchaValid";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const axios = require('axios');
import https from "../../http-commons-auth";
import { renderLabel } from "../../Utils/renderLabel";

export default function Register({ navigation }) {

    const [selectedIndex, setselectedIndex] = useState(1);
    const [account, setAccount] = useState({ value: '', error: '' });

    const [phone, setPhone] = useState({ value: '', error: '' });
    const [identity, setIdentity] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [address, setAddress] = useState({ value: '', error: '' });
    const [accountName, setaccountName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [rePassword, setrePassword] = useState({ value: '', error: '' });
    const [capcha, setCapcha] = useState({ value: '', error: '' });
    const [validcapcha, setvalidcapcha] = useState('');
    const [hidePass, setHidePass] = useState(false);
    const [hiderePass, setHiderePass] = useState(false);
    const buttons = ['cá nhân', 'tổ chức']
    const characters ='qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    const dispatch = useDispatch();

    function handleBack() {
        navigation.goBack();
    }

    function updateIndex(selected) {
        setselectedIndex(selected);
    }

    useEffect(() => {
        randomCapcha();
        const intervalId = setInterval(() => {
            randomCapcha();
        }, 120000);
        return () => clearInterval(intervalId); 
    }, []);

    function randomCapcha(){
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       setvalidcapcha(result);
    }
    function genCapcha(label) {
        return (
            <View style={{flexDirection:"row"}}>
            <Text>{label}</Text>
            <Text style={{color:theme.colors.error}}>*</Text>
            <SafeAreaView style={{marginLeft:5,backgroundColor:theme.colors.primary,justifyContent: 'center'}}>
                <Text style={{color:theme.colors.white,fontWeight:"bold",paddingHorizontal:5}}>{validcapcha}</Text>
            </SafeAreaView>
                <TouchableOpacity 
                onPress={randomCapcha}
                style={{marginLeft:5,}}>
                    <Icon
                        name='refresh'
                        size={20}
                        color='blue'
                    />
                </TouchableOpacity>
            </View>
        );
    }

    const RegisterFormSubmit = () => {
        validateValue()  

    }

    function validateValue(){
        const nameError = nameValidator(account.value)
        const phoneError = nameValidator(account.value)
        const identityErr = identityValid(identity.value)
        const emailErr = email1Valid(email.value)
        const addressError = nameValidator(address.value)
        const accountNameError = nameValidator(accountName.value)
        const passError = passwordValidator(password.value)
        const repassError = passwordValidator(rePassword.value)
        const capchaErr = capchaValid(capcha.value,validcapcha);
        if (nameError ||
            identityErr ||
            addressError ||
            accountNameError ||
            passError ||
            repassError ||
            phoneError ||
            emailErr||capchaErr) {

            setCapcha({ ...capcha, error: capchaErr });
            setPhone({ ...phone, error: phoneError });
            setAccount({ ...account, error: nameError });
            setIdentity({ ...identity, error: identityErr });
            setEmail({ ...email, error: emailErr });
            setAddress({ ...address, error: addressError });
            setaccountName({ ...accountName, error: accountNameError });
            setrePassword({ ...rePassword, error: repassError });
            setPassword({ ...password, error: passError });
            return
        }else{
            const data = setupdata();
            var config = {
                method: 'post',
                url: 'https://sandbox.xti.vn/api/nsd/RegisterUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            };

            axios(config)
                .then(function (response) {
                    navigation.navigate("login");
                })
                .catch(function (error) {
                    Alert.alert("Error: " + error.response.data);

                });
        }
    }
   function setupdata(){
    let result = {
        MaDVi: '000',
        Ma: accountName.value,
        Ten: account.value,
        Email: email.value,
        DiaChi: address.value,
        CCMS: identity.value,
        Mobile: phone.value,
        Pas: password.value,
        RePas: rePassword.value,
        Loai: selectedIndex == 0 ? 'C' : 'T',
      }
      console.log(result);
   }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, maxHeight: 40, backgroundColor: theme.colors.error }}>
                <HeaderActivity header={"Đăng ký"} goback={handleBack} />
            </View>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 10, marginTop: 10 }}>
            <ScrollView  >
                <View style={{ flex: 0.5,alignItems:"center" }}>
                    <ButtonGroup
                        onPress={updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 40,width:200, borderRadius: 20, }}
                    />
                </View>

                <View>

                    <Input
                        value={account.value}
                        label={renderLabel("Tên")}
                        onChangeText={text => setAccount({ value: text, error: '' })}
                        errorMessage={account.error}
                        leftIcon={
                            <Icon
                                name='user'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        value={phone.value}
                        label={renderLabel("Điện thoại")}
                        onChangeText={text => setPhone({ value: text, error: '' })}
                        errorMessage={phone.error}
                        leftIcon={
                            <Icon
                                name='phone'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        value={identity.value}
                        keyboardType="numeric"
                        label={selectedIndex == 1 ? renderLabel("MÃ SỐ THUẾ"): renderLabel("CMT/CCCD") }
                        onChangeText={text => setIdentity({ value: text, error: '' })}
                        errorMessage={identity.error}
                        leftIcon={
                            <Icon
                                name='id-card'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        value={email.value}
                        label={renderLabel("Email")}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        errorMessage={email.error}
                        leftIcon={
                            <Icon
                                name='envelope-open'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        value={address.value}
                        label={renderLabel("Địa chỉ")}
                        onChangeText={text => setAddress({ value: text, error: '' })}
                        errorMessage={address.error}
                        leftIcon={
                            <Icon
                                name='id-badge'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        style={{ height: 40 }}
                        value={accountName.value}
                        label={renderLabel("Tài khoản")}
                        onChangeText={text => setaccountName({ value: text, error: '' })}
                        errorMessage={accountName.error}
                        leftIcon={
                            <Icon
                                name='user-circle'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <Input
                        style={{ height: 40 }}
                        value={password.value}
                        label={renderLabel("Mật khẩu")}
                        secureTextEntry={hidePass ? false : true}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        errorMessage={password.error}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={14}
                                color='black'
                            />
                        }
                        rightIcon={
                            <Icon
                                onPress={() => setHidePass(!hidePass)}
                                name={hidePass ? 'eye-slash' : 'eye'}
                                size={24}
                                color='black'
                            /> }
                    />
                    

                    <Input
                        style={{ height: 40 }}
                        value={rePassword.value}
                        label={renderLabel("Nhập lại mật khẩu")}
                        secureTextEntry={hiderePass ? false : true}
                        onChangeText={text => setrePassword({ value: text, error: '' })}
                        errorMessage={rePassword.error}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={14}
                                color='black'
                            />
                        }
                        rightIcon={
                            <Icon
                                onPress={() => setHiderePass(!hiderePass)}
                                name={hiderePass ? 'eye-slash' : 'eye'}
                                size={24}
                                color='black'
                            /> }
                    />

                    <Input
                        value={capcha.value}
                        label={genCapcha("Capcha")}
                        onChangeText={text => setCapcha({ value: text, error: '' })}
                        errorMessage={capcha.error}
                        leftIcon={
                            <Icon
                                name='snapchat-square'
                                size={14}
                                color='black'
                            />
                        }
                    />

                    <SafeAreaView style={{flexDirection:"row"}}>
                        <Text style={{marginHorizontal:10}}>bạn đã có tài khoản </Text>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('login')}
                        >
                        <Text style={{color:theme.colors.primary,textDecorationLine: 'underline'}} >Đăng nhập</Text>
                        </TouchableOpacity>
                    </SafeAreaView>



                        <TouchableOpacity
                            style={styles.button}
                            onPress={RegisterFormSubmit}
                        >
                            <Text style={{ textAlign: "center", color: theme.colors.white, fontWeight: "bold" }}>Gửi thông tin</Text>
                        </TouchableOpacity>

                </View>

            </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        flex: 1,
        flexDirection: "column",
    }, button: {
        borderRadius: 20,
        padding: 10,
        marginVertical:20,
       
        marginHorizontal:50,
        elevation: 2,
        backgroundColor: theme.colors.primary
    }
});

