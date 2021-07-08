import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import BackButton from "../../component/BackButton";
import Background from "../../component/Background";
import Button from "../../component/Button";
import Header from "../../component/Header";
import Logo from "../../component/Logo";
import TextInput from "../../component/TextInput";
import { theme } from "../../core/theme";
import { emailValidator } from "../../Utils/emailValidator";
import { passwordValidator } from "../../Utils/passwordValidator";
import { useDispatch } from "react-redux";
import { getAccount,getToken } from "./Login-reducer";
import axios from "axios";
import { RawButton } from "react-native-gesture-handler";
import {decode as atob, encode as btoa} from 'base-64'

export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const dispatch = useDispatch();

  const onLoginPressed = () => {
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }
    setEmail({ value: '0964892238', error: '' });
    setPassword({ value: 'Sonmang98.', error: '' });
    let dataraw = 'grant_type=password&username='+email.value+'&password='+btoa(password.value)+'&client_id=000&client_secret=M&redirect_uri=';
    dispatch(getToken(dataraw))
      .then(data => {
          if(data!=null){
            getAccountInfo(data.access_token);
          }
        navigation.navigate('mainpage');
      })
      .catch(e => {
        // console.log(e);
      });


  }

  function getAccountInfo(token){
    dispatch(getAccount(token))
    .then(data => {
      navigation.navigate('mainpage');
    })
    .catch(e => {
    });
  }

  function loaDatAccount(id_token) {
    dispatch(getAccount(id_token))
      .then(data => {
        navigation.navigate('mainpage');
      })
      .catch(e => {
      });
    navigation.navigate('mainpage');
  }
  return (
    <View style={styles.container}>
    <Header header={"Login"}/>
      <Logo />
      <TextInput
        style={{paddingHorizontal:20}}
        label="Nhập tài khoản"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        style={{paddingHorizontal:20}}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
      <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Quên mật khẩu ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </View>

      <View style={{width:320}}>
        <Button mode="contained" onPress={onLoginPressed}>
          Đăng nhập
        </Button>
      </View>

      <View style={{width:320}}>
        <Button mode="contained" onPress={onLoginPressed}>
          Thoát
        </Button>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    flex:2,
    // backgroundColor:theme.colors.primary,
    maxHeight:30,
    justifyContent:"space-between",
    flexDirection:"row",
  },
  forgot: {
    fontSize: 13,
    flex:1,
    alignItems:"center",
    paddingHorizontal:30,
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

