import React, { useState, useEffect } from 'react';
import { View, Text,Modal,FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
import { Input, ButtonGroup } from 'react-native-elements';
import { getdata,getCarBrands } from './shop-reducer';
import { getCurrentDate } from '../../Utils/getCurentDate';
import ModalComponent from './ModalComponent';
import ModalComponentBrands from './ModalComponentBrands'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function CarInfoComponent(props) {

    const [account, setAccount] = useState({ value: '', error: '' });

    const [dateFrom, setdateFrom] = useState({ value:''+getCurrentDate(0), error: '' });
    const [dateTo, setdateTo] = useState({ value:''+getCurrentDate(1), error: '' });

    const [listData, setlistData] = useState(null); // danh sách data call từ API về
    const [listCar, setlistCar] = useState(null); // danh sách hãng xe
    const [selectedCar, setselectedCar] = useState(null); // select hãng xe
    const [CarBrands, setCarBrands] = useState(null); // danh sách nhãn hiệu xe
    const [selectedCarBrand, setselectedCarBrand] = useState(null); // chọn nhãn hiệu xe

    const [modalVisible, setModalVisible] = useState(false);// modal hãng xe 
    const [modalVisibleBrands, setmodalVisibleBrands] = useState(false);// modal hãng xe 

    const dispatch = useDispatch();
    const logins = useSelector(state => state.login);
    const listDataSlt = useSelector(state => state.shopDatas);

    
// code logic

    useEffect(() => {
        if (logins != null) {
            if (listDataSlt.ShopDatas != null) {
                setlistData(listDataSlt);
                setlistCar(listDataSlt.ShopDatas.DanhSachHangXe);
            } else {
                dispatch(getdata(logins.Token.access_token))
                    .then(data => {
                        setlistData(data);
                        setlistCar(data.DanhSachHangXe);
                    })
                    .catch(e => {
                        // console.log(e);
                    });
            }
        }
    }, []);

    // cac giao dien con 
    function renderLabel(label) {
        return (
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: 'bold' }}>{label + " "}</Text>
                <Text style={{ color: theme.colors.error }}>*</Text>
            </View>
        );
    }
    

    // component car
    function tongleModal(){
       setModalVisible(!modalVisible) 
    }
    function selectedCarBrands(){
        setselectedCarBrand(null);
    }
    function selectCarmodal(item){
         setselectedCar(item);
         console.log(item);
        dispatch(getCarBrands(item.Ten))
            .then(data => {
                console.log(data);
                setCarBrands(data);
            })
            .catch(e => {
                // console.log(e);
            });
        //console.log("huhu ",item);
    }

    // car brands

    function setselectedCarBrands(item){
        setselectedCarBrand(item);
        console.log(item);
   }


    function tongleModalBrands(){
        setmodalVisibleBrands(!modalVisibleBrands) 
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
                <TouchableOpacity
                onPress={() => tongleModal()}
                >
                <Input
                    value={selectedCar!=null ? selectedCar.Ten:null}
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
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => tongleModalBrands()}
                >
                    <Input
                         value={selectedCarBrand?selectedCarBrand.Ten:null}
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
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flex: 1, maxWidth: windowWidth }} >
                    <View style={{ flex: 1 }}>
                        <Input
                            value={dateFrom.value}
                            label={renderLabel("Ngày hiệu lực")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            value={dateTo.value}
                            label={renderLabel("Ngày kết thúc")}
                            onChangeText={text => setAccount({ value: text, error: '' })}
                            errorMessage={account.error}
                        />
                    </View>
                </View>

                <View >
                    <Text style={styles.titleStyleBlack}>Ngày cấp : {dateFrom.value}</Text>
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
            {/* {renderModal()}
            {renderModalBrands()} */}
            <ModalComponent
                listCar={listCar}
                modalVisible={modalVisible}
                setselectedCarBrand={selectedCarBrands}
                setselectedCar={selectCarmodal}
                selectCarModal={selectedCar}
                tongleModal={tongleModal} />

            <ModalComponentBrands
                listCar={CarBrands}
                modalVisible={modalVisibleBrands}
                setselectedCarBrand={setselectedCarBrands}
                setselectedCar={setselectedCarBrands}
                tongleModalBrands={tongleModalBrands} />

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
