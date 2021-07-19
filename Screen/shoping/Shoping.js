import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, StyleSheet, Image, SwitchIOS } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WebView from "react-native-webview";
import { Button } from 'react-native-elements';
import HeaderActivity from '../../component/HeaderActivity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../../core/theme";
import UserComponent from './UserComponent';
import CarInfoComponent from './CarInfoComponent';
import BillComponent from './BillComponent';
import {Switch} from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import { bold } from 'chalk';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function Shoping({ route, navigation }) {

  const [isSwitchTNDS, setisSwitchTNDS] = React.useState(false);
  const [isSwitchTNN, setisSwitchTNN] = React.useState(false);
  const [isSwitchNHD, setisSwitchNHD] = React.useState(false);
  const [isSelectrules, setisSelectrules] = React.useState(false);

    const { item } = route.params;
    console.log(item);
    const data = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [productDT, setproductDT] = useState(null);

    function handleClick() {
        navigation.goBack();
    }
    

  function renderLabel() {
    return (
      <View style={{flexDirection:'column',justifyContent: 'center'}}>

        <View style={{ flexDirection: "row" }}>
          <Text style={{fontWeight:'bold'}}>{"Tôi đã đọc và đồng ý với "}</Text>
          <Text style={styles.TextLink}>{"Quy tắc bảo hiểm"}</Text>
        </View>

        <Text style={{fontWeight:'bold'}}>{"đi kèm sản phẩm này của XTI"}</Text>
      </View>
    );
  }


    const onToggleSwitch = (type) => {
      switch(type) {
        case 'TNDS':
          setisSwitchTNDS(!isSwitchTNDS);
          break;
        case 'TNN':
          setisSwitchTNN(!isSwitchTNN);
          break;
          case 'NHD':
          setisSwitchNHD(!isSwitchNHD);
            break;
        default:
          
      }
      
  }


    return (
        <View style={{flex:1}}>
            <View style={{ flex: 1,maxHeight:40 }}>
                <HeaderActivity header={item.Ten} goback={handleClick} />
            </View>
            <ScrollView style={styles.container}>

            <UserComponent />

            <CarInfoComponent />

          {/* bảo hiểm trách nhiệm dân sự bắt buộc */}
          <SafeAreaView style={ styles.bottomLine}>
            {/* check confidition here */}
            {item.Ten.toLowerCase().indexOf('TNDS'.toLowerCase()) < 0 ?
              <View style={styles.containerRow}>
                <Switch value={isSwitchTNDS} onValueChange={() => onToggleSwitch('TNDS')} />
                <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>Bảo hiểm TNDS bắt buộc</Text>
              </View>
            : 
            <View style={{flexDirection:'row'}}>
            <Switch value={true}  />
            <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>Bảo hiểm TNDS bắt buộc</Text>
            </View>
            }
            
           
          </SafeAreaView>
          {/* end  */}

          {/* bảo hiểm tai nạn người trên xe */}
          {item.Ten.toLowerCase().indexOf('ô tô'.toLowerCase()) > 0 ? 
          <SafeAreaView style={[styles.containerRow, styles.bottomLine]}>
            {/* check confidition here */}
            <Switch value={isSwitchTNN} onValueChange={() => onToggleSwitch('TNN')} />
            <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>Bảo hiểm tai nạn người trên xe</Text>
          </SafeAreaView>
          : null}
          {/* end */}

          {/* Nhận hóa đơn */}
          {item.Ten.toLowerCase().indexOf('ô tô'.toLowerCase()) > 0 ? 
          <SafeAreaView style={[styles.containerRow, styles.bottomLine]}>
            {/* check confidition here */}
            <Switch value={isSwitchNHD} onValueChange={() => onToggleSwitch('NHD')} />
            <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>Nhận hóa đơn</Text>
          </SafeAreaView>
         : null}
         {/* end */}

          {/* phí */}
          {item.Ten.toLowerCase().indexOf('xe máy'.toLowerCase()) > 0 ? 
          <SafeAreaView style={[styles.containerRow, styles.bottomLine]}>
            <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>PHÍ: 66000 VND</Text>
          </SafeAreaView>
         : null}
         {/* end phí */}
          {isSwitchNHD ? <BillComponent /> : null}
          

          {/* tôi đã đọc và đồng ý với đièu khoản */}
          <SafeAreaView style={[styles.styleCheckBox, styles.bottomLine]}>
          <CheckBox
              containerStyle={{ backgroundColor: 'transparent' }}
              onPress={() => setisSelectrules(!isSelectrules)}
              checked={isSelectrules}
            />
            {renderLabel()}
          </SafeAreaView>

            </ScrollView>

        <SafeAreaView style={styles.forgotPassword}>

        <TouchableOpacity>
          <Text style={styles.forgot}>tổngtiền:</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{backgroundColor:theme.colors.primary,margin:5}}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.forgot1}>Thanh Toán</Text>
        </TouchableOpacity>

        </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal:5,
    },
    containerRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center', //Centered vertically
      paddingHorizontal:5,
      marginVertical:5,
  },
  styleCheckBox: {
    flex: 1,
    flexDirection: 'row',
    marginVertical:5,
    marginRight:10,
},
    forgotPassword: {
        width: '100%',
        flex: 1,
        maxHeight: 50,
        justifyContent: "space-between",
        flexDirection: "row",
      },
      forgot: {
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        textAlignVertical: 'center',
        color: theme.colors.secondary,
      },
      forgot1: {
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        textAlignVertical: 'center',
        color: theme.colors.white,
      },
      bottomLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical:10,
    },
    TextLink: {
      color:theme.colors.primary,
      textDecorationLine: 'underline',
      fontWeight:'bold',
  }
});
