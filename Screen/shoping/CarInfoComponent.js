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
export default function CarInfoComponent() {

    const [isSwitch, setisSwitch] = useState(false);

    const [account, setAccount] = useState({ value: '', error: '' });

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


            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Icon
                    name="car"
                    size={24}
                    color="#5AE5F5"
                />
                <Text style={styles.titleStyle}>Thông tin về ô tô</Text>
            </View>


            <SafeAreaView style={{ marginTop: 10, flexDirection: 'column' }}>

                <View style={{ flexDirection: 'row', flex: 1, maxWidth: windowWidth }} >

                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Biển KS")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Số khung")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>
                </View>

                <Input
                    value={account.value}
                    label={renderLabel("Số máy")}
                    onChangeText={text => setAccount({ value: text, error: '' })}
                    errorMessage={account.error}
                />

                <Input
                    // value={phone.value}
                    label={renderLabel("Chọn hãng xe")}
                    disabled={true}
                    // onChangeText={text => setPhone({ value: text, error: '' })}
                    // errorMessage={phone.error}
                    rightIcon={
                        <Icon
                            name='sort-down'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    // value={phone.value}
                    label={renderLabel("Nhãn hiệu")}
                    disabled={true}
                    // onChangeText={text => setPhone({ value: text, error: '' })}
                    // errorMessage={phone.error}
                    rightIcon={
                        <Icon
                            name='sort-down'
                            size={24}
                            color='black'
                        />
                    }
                />

                <View style={{ flexDirection: 'row', flex: 1, maxWidth: windowWidth }} >
                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Ngày hiệu lực")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Ngày kết thúc")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>
                </View>

                <View >
                    <Text style={styles.titleStyleBlack}>Ngày cấp : </Text>
                </View>


                <View style={{ flexDirection: 'row', flex: 1, maxWidth: windowWidth }} >
                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("mục đích sử dụng")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Loại xe")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flex: 1, maxWidth: windowWidth }} >
                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Chỗ ngồi")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            value={account.value}
                            label={renderLabel("Trọng tải")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>
                </View>

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
    },
    titleStyleBlack: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
        marginVertical: 20,
    }
});
