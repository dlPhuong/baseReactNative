import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Pressable, Dimensions, StyleSheet } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import * as Keychain from 'react-native-keychain';
import { getAccount, getToken } from "../Login/Login-reducer";
import { useDispatch } from "react-redux";
import * as Progress from 'react-native-progress';
export default function Splash({ navigation }) {
    const [timeCountDown, settimeCountDown] = useState(1000);
    const [proGress, setproGress] = useState(0);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     startTimer();
    //   }, []);

    useEffect(() => {
        startProgress();
    }, []);

    function startProgress() {
        let pro = proGress;
        let timeChange;
        const clock = () => {

            if (pro < 1) {
                pro = pro + 0.2;
                setproGress(pro);
                console.log(pro);
            } else {
                clearInterval(timeChange);
                checkLogin();
            }
        };
        timeChange = setInterval(clock, 100);
    }

    function startTimer() {
        let timeChange;
        let time = timeCountDown;
        const clock = () => {
            if (time > 0) {
                time = time - 1;
                settimeCountDown(time);
            } else {
                clearInterval(timeChange);
                checkLogin();
            }
        };
        timeChange = setInterval(clock, 1000);
    }

    function checkLogin() {
        Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
            .then(credentials => {
                console.log(credentials);
                if (credentials.username == null) {
                    navigation.navigate('login');
                } else {
                    let dataraw = 'grant_type=password&username=' + credentials.username + '&password=' + btoa(credentials.password) + '&client_id=000&client_secret=M&redirect_uri=';
                    dispatch(getToken(dataraw))
                        .then(data => {
                            if (data != null) {
                                getAccountInfo(data.access_token);
                            }
                        })
                        .catch(e => {
                            Alert.alert("Đăng nhập thất bại! ");
                        });
                }
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


    return (
        <View style={styles.container}>
            <Text>BẢO HIỂM XUÂN THÀNH </Text>
            <Progress.Bar
                animationType="spring"
                progress={proGress}
                width={200} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

