import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,SafeAreaView, Alert, Pressable, Dimensions, StyleSheet } from "react-native";
import Button from "../../component/Button";
import Header from "../../component/Header";
import TextInput from "../../component/TextInput";
import { theme } from "../../core/theme";
import { useSelector } from "react-redux";
import { decode as atob, encode as btoa } from 'base-64'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderActivity from "../../component/HeaderActivity";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { acc } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { capchaValid } from "../../Utils/capchaValid";
import { renderLabel } from "../../Utils/renderLabel";
import { nameValidator } from "../../Utils/nameValidator";
import { email1Valid } from "../../Utils/email1Valid";
import { validOtp } from "../../Utils/validOtp";

var axios = require('axios');

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function ResetPasswordScreen({ navigation }) {

    const characters ='qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

    const [account, setAccount] = useState({ value: '', error: '' });
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [capcha, setCapcha] = useState({ value: '', error: '' });
    const [validcapcha, setvalidcapcha] = useState('');
    const [otp, setOtp] = useState('');
    const [otpvalue, setOtpValue] = useState({ value: '', error: '' });

    const [pass, setPass] = useState({ value: '', error: '' });
    const [rePass, setRepass] = useState({ value: '', error: '' });

    const [checkotp, setcheckotp] = useState('b2');
    const logins = useSelector(state => state.login);
    function handleBack() {
        navigation.goBack();
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
            <Text style={{fontWeight:'bold'}}>{label}</Text>
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

    function resetPass() {// bước 1
        const accouterr = nameValidator(account.value)
        const phoneError = nameValidator(phone.value)
        const emailErr = email1Valid(email.value)
        const capchaErr = capchaValid(capcha.value,validcapcha)
        if (accouterr || phoneError || emailErr ||capchaErr) {
            setAccount({ ...account, error: accouterr });
            setPhone({ ...phone, error: phoneError });
            setEmail({ ...email, error: emailErr });
            setCapcha({ ...capcha, error: capchaErr });
            return;
        }else{
         getCodeOtp();
        }
    }

    function getCodeOtp(){ 
          
        var config = {
            method: 'get',
            url: 'https://sandbox.xti.vn/api/nsd/GetForgotPass?username='+account.value+'&email='+email.value+'&mobile='+phone.value,
            headers: { 
            }
          };
          
          axios(config)
          .then(function (response) {
              setOtp(response.data);
            setcheckotp('b2');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function validateOtp(){ // bước 2
        const otpErr = validOtp(otpvalue.value,otp);
        if (otpErr) {
            setOtpValue({ ...otpvalue, error: otpErr }); 
            return;  
        }else{
            if(otp===otpvalue.value){
                setcheckotp('b3');
            }
        }

    }

    function changePAssword(){ // bước 3

        const passErr = nameValidator(pass.value);
        const repassErr = nameValidator(rePass.value);
        if (passErr || repassErr) {
            setPass({ ...pass, error: passErr }); 
            setRepass({ ...rePass, error: repassErr }); 
            return;  
        }
        if(pass.value != rePass.value){
            setRepass({ ...rePass, error: 'xin vui lòng nhập lại' }); 
        }
        else{


            let data = JSON.stringify({"UserName":""+account.value+"","Email":""+email.value+"","Mobile":""+phone.value+"","MaXacMinh":""+otpvalue.value+"","MaMoi":""+pass.value+"","MaMoiLai":""+rePass.value+""});

            var config = {
                method: 'post',
                url: 'https://sandbox.xti.vn/api/nsd/ChangePass',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                   Alert.alert("đổi mật khẩu thành công cho tài khoản "+account.value);
                   navigation.navigate('login');
                })
                .catch(function (error) {
                    Alert.alert(""+error.response.data);
                });


        }

    }

    function onclickButton() {
        switch (checkotp) {
            case 'b1':
                resetPass();
                break;
            case 'b2':
                validateOtp();
                break;
            case 'b3':
                changePAssword();
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5, backgroundColor: theme.colors.error }}>
                <HeaderActivity header={"Lấy lại mật khẩu"} goback={handleBack} />
            </View>

            <View style={{ flex: 9, marginHorizontal: 10, marginTop: 10 }}>

                {checkotp == 'b1' ?
                    <View>
                        <Input
                            style={{ height: 40 }}
                            value={account.value}
                            errorMessage={account.error}
                            label={renderLabel("Tài khoản")}
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
                            label={renderLabel("Số điện thoại")}
                            value={phone.value}
                            errorMessage={phone.error}
                            onChangeText={text => setPhone({ value: text, error: '' })}
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
                            label={renderLabel("Email")}
                            value={email.value}
                            errorMessage={email.error}
                            onChangeText={text => setEmail({ value: text, error: '' })}
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
                            value={capcha.value}
                            errorMessage={capcha.error}
                            label={genCapcha("capcha")}
                            onChangeText={text => setCapcha({ value: text, error: '' })}
                        />
                    </View>
                    : null}

                {checkotp == 'b2' ?
                    <View>
                        <Input
                            style={{ height: 40 }}
                            label={renderLabel("Xác nhận mã ")}
                            value={otpvalue.value}
                            errorMessage={otpvalue.error}
                            onChangeText={text => setOtpValue({ value: text, error: '' })}
                        />
                        <Text>một mã bí mật đã được gửi về địa chỉ email bạn cung cấp. 
                            Nếu chưa nhận được mã nào vui lòng </Text>
                            <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                            onPress={()=>getCodeOtp()}
                            >
                            <Text style={{color:theme.colors.primary}}> nhấn vào Đây </Text>
                            </TouchableOpacity>
                            <Text>để nhận lại mã xác thực</Text>
                            </View>

                           
                    </View>
                    : null}

                    {checkotp == 'b3' ? 
                    <View>
                        <Input
                            style={{ height: 40 }}
                            label={renderLabel("Mật khẩu mới")}
                            value={pass.value}
                            errorMessage={pass.error}
                            onChangeText={text => setPass({ value: text, error: '' })}
                        />

                        <Input
                            style={{ height: 40 }}
                            label={renderLabel("Xác nhận mật khẩu mới ")}
                            value={rePass.value}
                            errorMessage={rePass.error}
                            onChangeText={text => setRepass({ value: text, error: '' })}
                        />
                        
                         </View>
                    
                    :null}

                <Pressable
                    style={styles.button}
                    onPress={() => onclickButton()}>
                    <Text style={{ textAlign: "center", color: theme.colors.white, fontWeight: "bold" }}>{checkotp =='b1' ? "Gửi thông tin" : checkotp=='b2' ? "xác nhận OTP" : checkotp=='b3'? "Xác nhận mật khẩu":null  }</Text>
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

