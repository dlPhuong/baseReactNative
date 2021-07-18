import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { Text, View, Modal, SafeAreaView, Image } from 'react-native'
import { theme } from '../../core/theme'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInput from '../../component/TextInput';
import { CheckBox } from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import { getdata } from './shop-reducer';

export default function ModalComponentBrands(props) {
    const [searchText, setsearchText] = React.useState('');
    const [filteredData, setfilteredData] = React.useState(null);
    const [listCar, setlistCar] = useState(null); // danh sách hãng xe
    const [selectedCar, setselectedCar] = useState(null); // select hãng xe

    const dispatch = useDispatch();



    // useEffect(() => {
    //     // console.log("hmm 123 ",listDataSlt.ShopDatas.DanhSachHangXe);
    //     if (logins != null) {
    //         if (listDataSlt.ShopDatas != null) {
    //             setlistCar(listDataSlt.ShopDatas.DanhSachHangXe);
    //         } else {
    //             dispatch(getCarBrands(item.Ten))
    //             .then(data => {
    //                 console.log(data);
    //                 setCarBrands(data);
    //             })
    //             .catch(e => {
    //                 // console.log(e);
    //             });
    //         }
    //     }
    // }, []);

    const renderItemModal = ({ item }) => {
        return (
            <CheckBox
                onPress={() => selectCar(item)}
                containerStyle={styles.checkboxSize}
                title={item.Ten}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={selectedCar ? selectedCar.Ten == item.Ten ? true : false : false}
            />
        );
    }
    const selectCar = (item) => {

        if (selectedCar != null) {
            if (selectedCar.Ten != item.Ten) {
                props.setselectedCarBrand(null);
            }
        }
        
       props.setselectedCar(item);
       props.tongleModalBrands();
    };
    const search = (text) => {
        setsearchText(text);
        let filteredData = listCar.filter(function (value) {
            return value.Ten.toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setfilteredData(filteredData);
    };



    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.tongleModalBrands()
                }}
            >
                <View style={styles.modalView}>

                    <SafeAreaView
                        style={styles.headerModal}
                        onPress={() => props.tongleModalBrands()}
                    >
                        <TouchableOpacity
                            onPress={() => props.tongleModalBrands()}
                        >
                            <Icon
                                style={{ marginLeft: 10 }}
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
                        style={{ width: windowWidth }}
                         data={filteredData && filteredData.length > 0 ? filteredData : props.listCar}
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
        height: windowHeight,
        width: windowWidth,
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
        width: windowWidth * 0.9,
    },
    textStyle: {
        color: theme.colors.white,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        marginLeft: 10,
    },
    headerModal: {
        height: 40,
        width: windowWidth,
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

});