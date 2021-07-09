import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import Header from "../../../component/Header";
import Carosel from "../../../component/Carosel";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "./home-reducer";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function HomeRoute({ navigation }) {
  const dataUseful = [
    {
      'ImageUrl': '../../../assets/KM_home_icon.png',
      'Ten': 'Thông tin khuyến mãi'
    }, {
      'ImageUrl': '../../../assets/KM_home_icon.png',
      'Ten': 'Hướng dẫn mua hàng'
    }, {
      'ImageUrl': '../../../assets/KM_home_icon.png',
      'Ten': 'Mạng lưới XTI'
    }
  ]
  const [product, setproduct] = useState(null);
  const [product1, setproduct1] = useState(dataUseful);

  const productRedux = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productRedux.products != null) {
      setproduct(productRedux.products);
    }
    else {
      let dataraw = { Tu: 1, Den: 12, Ten: "" };
      dispatch(getProduct(dataraw))
        .then(data => {
          if (data != null) {
            console.log(data);
            setproduct(data);
          }
        })
        .catch(e => {
          // console.log(e);
        });
    }
  }, []);

  // item flatlist
  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('productDetail',{item})}
            style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <Image
              style={styles.IMGFlatlistItem}
              source={{
                uri: item.ImageUrl,
              }}
          />
          <Text style={styles.TextFlatlistItem}>{item.Ten}</Text>
        </TouchableOpacity>
    );
  }

  const renderItem1 = ({ item }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
        <Image
          style={styles.IMGFlatlistItem}
          source={require('../../../assets/KM_home_icon.png')}
        />
        <Text style={styles.TextFlatlistItem}>{item.Ten}</Text>
      </View>
    );
  }

  return (

    <ScrollView style={{ flex: 1 }}>
      <View style={{ position: 'absolute', flex: 1, left: 0, right: 0, top: 0 }}>
        <Header header={"Trang chủ"} />
      </View>
      <View style={{ flex: 1 }}>

        <Carosel />
        
        <View style={styles.textTitile}>
          <Text style={styles.itemtextTitile}>
            Sản phẩm bảo hiểm
          </Text>
          <Image
            style={styles.image}
            style={styles.image}
            source={require('../../../assets/Hotline.png')}
          />
        </View>

        {/* danh sách sản phẩm */}
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:10 }}>
          <FlatList
            data={product ? product.Items : null}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={item => item.Id}
          />
        </SafeAreaView>



        <Text style={styles.itemtextTitile1}>
          Thông tin hữu ích
        </Text>

        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={product1 ? product1 : null}
            numColumns={3}
            renderItem={renderItem1}
            keyExtractor={item => item.Id}
          />
        </SafeAreaView>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  textTitile: {
    width: '100%',
    flex: 1,
    marginTop: 18,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemtextTitile: {
    fontSize: 16,
    flex: 1,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginLeft: 20,
  },
  itemtextTitile1: {
    fontSize: 16,
    flex: 1,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginLeft: 20,
    marginTop: 16,
  },
  image: {
    flex: 1,
    width: 80,
    height: 40,
    resizeMode: 'contain'
  },
  IMGFlatlistItem: {
    flex: 1,
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain',
  },
  TextFlatlistItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontFamily: "Cochin",
    color: "#00CCFF",
    width: 100,
  },

});
