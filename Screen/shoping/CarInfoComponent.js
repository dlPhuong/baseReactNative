import React, { useState, useEffect } from 'react';
import { View, Text,Modal,FlatList, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WebView from "react-native-webview";
import { Button } from 'react-native-elements';
import HeaderActivity from '../../component/HeaderActivity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
import { Switch } from 'react-native-elements';
import { Input, ButtonGroup } from 'react-native-elements';
import { getdata,getCarBrands } from './shop-reducer';
import TextInput from "../../component/TextInput";
import { CheckBox } from 'react-native-elements'
import { getCurrentDate } from '../../Utils/getCurentDate';
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



    const [searchText, setsearchText] = React.useState('');
    const [filteredData, setfilteredData] = React.useState(null);
    const [filteredDataBrands, setfilteredDataBrands] = React.useState(null);
    const dispatch = useDispatch();
    const logins = useSelector(state => state.login);
    const listDataSlt = useSelector(state => state.shopDatas);

    
// code logic

    useEffect(() => {
        // console.log("hmm 123 ",listDataSlt.ShopDatas.DanhSachHangXe);
        if (logins != null) {
            if (listDataSlt.ShopDatas != null) {
                setlistData(listDataSlt);
                setlistCar(listDataSlt.ShopDatas.DanhSachHangXe);
            } else {
                dispatch(getdata(logins.Token.access_token))
                    .then(data => {
                        console.log("hmm 123",data);
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
    // modal hãng xe 
    function renderModal() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {/* <View style={styles.centeredView}> */}

                        <View style={styles.modalView}>

                        <SafeAreaView
                            style={styles.headerModal}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <TouchableOpacity
                             onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Icon
                                style={{marginLeft:10}}
                                    name='times'
                                    size={24}
                                    color='white'
                                />
                            </TouchableOpacity>
                            <Text style={styles.textStyle}>chọn danh sách xe</Text>
                        
                        </SafeAreaView>
                    
                        <View>
                            <TextInput
                                style={styles.InputSearch}
                                label="Tìm kiếm"
                                value={searchText}
                                onChangeText={(text) => search(text)}
                            />
                        </View>

                                <FlatList
                                    style={{width:windowWidth}}
                                    data={filteredData && filteredData.length > 0 ? filteredData : listCar}
                                    renderItem={renderItemModal}
                                    keyExtractor={item => item.Ma}
                                    scrollEnabled={true}
                                />
                        </View>
                    {/* </View> */}
                </Modal>
            </View>

        );
    }
    const renderItemModal = ({ item }) => {
        return (
            <CheckBox
                onPress={()=>selectCar(item)}
                containerStyle={styles.checkboxSize}
                title={item.Ten}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={selectedCar ? selectedCar.Ten == item.Ten ? true : false : false}
            />
        );
    }
    const selectCar = (item) => {

        if(selectedCar!=null){
            if(selectedCar.Ten != item.Ten){
                setselectedCarBrand(null);
            }
        }

         setselectedCar(item);
         setModalVisible(!modalVisible);

        

         dispatch(getCarBrands(item.Ten))
         .then(data => {
            setCarBrands(data);
         })
         .catch(e => {
             // console.log(e);
         });

    };
    const search = (text) => {
        setsearchText(text);
        let filteredData = listCar.filter(function (value) {
            return value.Ten.toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setfilteredData(filteredData);
    };
    // end modal hãng xe

    // modal mẫu xe
    function renderModalBrands() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleBrands}
                    onRequestClose={() => {
                        setmodalVisibleBrands(!modalVisibleBrands);
                    }}
                >
                    {/* <View style={styles.centeredView}> */}

                        <View style={styles.modalView}>

                        <SafeAreaView
                            style={styles.headerModal}
                            
                        >
                            <TouchableOpacity
                             onPress={() => setmodalVisibleBrands(!modalVisibleBrands)}
                            >
                                <Icon
                                style={{marginLeft:10}}
                                    name='times'
                                    size={24}
                                    color='white'
                                />
                            </TouchableOpacity>
                            <Text style={styles.textStyle}>chọn danh sách mẫu xe</Text>
                        
                        </SafeAreaView>
                    
                        <View>
                            <TextInput
                                style={styles.InputSearch}
                                label="Tìm kiếm"
                                value={searchText}
                                onChangeText={(text) => searchBrands(text)}
                            />
                        </View>

                                <FlatList
                                    style={{width:windowWidth}}
                                    data={filteredDataBrands && filteredDataBrands.length > 0 ? filteredDataBrands : CarBrands}
                                    renderItem={renderItemModalBrands}
                                    keyExtractor={item => item.SoId}
                                    scrollEnabled={true}
                                />
                        </View>
                    {/* </View> */}
                </Modal>
            </View>

        );
    }
    const renderItemModalBrands = ({ item }) => {
        return (
            <CheckBox
                onPress={()=>selectCarBrands(item)}
                containerStyle={styles.checkboxSize}
                title={item.Ten}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={selectedCarBrand ? selectedCarBrand.Ten == item.Ten ? true : false : false}
            />
        );
    }
    const selectCarBrands = (item) => {
         setselectedCarBrand(item);
         setmodalVisibleBrands(!modalVisibleBrands);
    };
    const searchBrands = (text) => {
        setsearchText(text);
        let filteredData = CarBrands.filter(function (value) {
            return value.Ten.toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setfilteredDataBrands(filteredData);
    };
    // end modal mẫu xe
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
                onPress={() => setModalVisible(true)}
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
                    onPress={() => setmodalVisibleBrands(true)}
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
            {renderModal()}
            {renderModalBrands()}
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
    },
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        backgroundColor: "white",
        height:windowHeight,
        width:windowWidth,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      InputSearch: {
        height: 30,
        width:windowWidth*0.9,
    },
      textStyle: {
        color: theme.colors.white,
        fontWeight: "bold",
        textAlign: "center",
        fontSize:18,
        marginLeft:10,
      },
      headerModal: {
        height:40,
        width:windowWidth,
        flexDirection:'row',
        backgroundColor:theme.colors.primary,
        justifyContent:'flex-start',
        alignItems: 'center'
      }

});
