import React, { useState } from "react";
import { View, Text, NativeModules, TouchableOpacity, Alert, StyleSheet, AsyncStorage } from "react-native";
import Button from "../../component/Button";
import Header from "../../component/Header";
import Logo from "../../component/Logo";
import TextInput from "../../component/TextInput";
import { theme } from "../../core/theme";
import { emailValidator } from "../../Utils/emailValidator";
import { passwordValidator } from "../../Utils/passwordValidator";
import { useDispatch } from "react-redux";
import { getAccount, getToken } from "./Login-reducer";
import axios from "axios";
import { RawButton } from "react-native-gesture-handler";
import { decode as atob, encode as btoa } from 'base-64'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { MMKV } from 'react-native-mmkv';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

export default function Login({ navigation }) {
  const { FingerModule } = NativeModules;
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const dispatch = useDispatch();

  const optionalConfigObject = {
    title: 'Xác thực vân tay', // Android
    imageColor: '#06e033', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Chạm vào cảm biến vân tay', // Android
    sensorErrorDescription: 'Vui lòng thử lại', // Android
    cancelText: 'Thoát', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }

    setEmail({ value: '0964892238', error: '' });
    setPassword({ value: 'Sonmang98.', error: '' });
    let dataraw = 'grant_type=password&username=' + email.value + '&password=' + btoa(password.value) + '&client_id=000&client_secret=M&redirect_uri=';
    dispatch(getToken(dataraw))
      .then(data => {
        if (data != null) {
          getAccountInfo(data.access_token);
        }
        navigation.navigate('mainpage');
      })
      .catch(e => {
        Alert.alert("Đăng nhập thất bại! ");
      });
  }

  function getAccountInfo(token) {
    dispatch(getAccount(token))
      .then(data => {
        navigation.navigate('mainpage');
      })
      .catch(e => {
      });
  }

  async function checkCountBioMetrics(credentials) { // check số lượng vân tay hiện có trong máy 
    const count = await FingerModule.getFingerprintInfo();
    // const value = MMKV.getNumber('count')
    const value = 3;
    console.log('count', value);
    if (value < count) { // nếu có vân tay thêm vào hệ thống 
      Alert.alert("phát hiện có vân tay mới thêm vào hệ thống bạn cần xác nhận lại mật khẩu của mình");
    } if (value >= count) {
      // xử lý đăng nhập bằng vân tay 
      TouchID.authenticate(`đăng nhập với user "${credentials.username}"`, optionalConfigObject)
        .then(() => {
          // xử lý đăng nhập
          let dataraw = 'grant_type=password&username=' + credentials.username + '&password=' + btoa(credentials.password) + '&client_id=000&client_secret=M&redirect_uri=';
          dispatch(getToken(dataraw))
            .then(data => {
              if (data != null) {
                getAccountInfo(data.access_token);
              }
              navigation.navigate('mainpage');
            })
            .catch(e => {
              Alert.alert("Đăng nhập thất bại! ");
            });
          // end

        });
    }
  }

  async function getDataBiometric() {
    Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
      .then(credentials => {
        console.log(credentials);
        if (credentials.username == null) {
          Alert.alert("Bạn chưa bật đăng nhập bằng vân tay vui lòng đăng nhập bằng tài khoản và mật khẩu");
        }
        // const credentials1 = { username:"0964892238", password:"Sonmang98.",count:3 }
        // checkCountBioMetrics(credentials1);
        checkCountBioMetrics(credentials);
      });

  }

  return (
    <View style={styles.container}>

      {/*<View style={styles.header}>*/}
      {/*  <Header header={"Login"}/>*/}
      {/*</View>*/}

      <Logo />
      <View style={styles.inputTextForm}>
        <TextInput
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
      </View>


      <View style={styles.inputTextForm}>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

      </View>

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Quên mật khẩu ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.forgot}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: 320 }}>
        <Button mode="contained" onPress={onLoginPressed}>
          Đăng nhập
        </Button>
        {/* <Button mode="contained" onPress={onLoginPressed}>
          Thoát
        </Button> */}

        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
          <Text>hoặc sử dụng đăng nhập bằng vân tay</Text>
          <TouchableOpacity
            onPress={() => getDataBiometric()}>
            <MaterialCommunityIcons name={'fingerprint'} color='#0099FF' size={55} />
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    flex: 2,
    // backgroundColor:theme.colors.primary,
    maxHeight: 30,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  forgot: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    color: theme.colors.secondary,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // new
  header: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0
  },
  inputTextForm: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20
  }
});

