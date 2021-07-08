import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Image } from 'react-native'
import { red200 } from 'react-native-paper/lib/typescript/styles/colors'
import { theme } from '../core/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from './BackButton'

export default function Header(props) {
  // return <Text style={styles.header} {...props} />
  return (
    <View style={styles.row}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.texthead}>
        {props.header}
      </Text>
      <MaterialCommunityIcons name="bell-ring" color={theme.colors.white} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 40,
    paddingVertical: 5,
    backgroundColor: '#3366CC',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  texthead: {
    flex: 1,
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  ringing: {
    width: 30,
    height: 30,
    alignItems: 'flex-end'
  },
})