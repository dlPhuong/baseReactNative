import React from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { Text, View, Image } from 'react-native'
import { red200 } from 'react-native-paper/lib/typescript/styles/colors'
import { theme } from '../core/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from './BackButton'
import { Badge } from 'react-native-paper';
export default function HeaderActivity(props) {
  // return <Text style={styles.header} {...props} />
  return (
    <View style={styles.row}>
      <TouchableOpacity
      onPress={()=> props.goback()}
      >
        <MaterialCommunityIcons name="arrow-left" color={theme.colors.white} size={24} />
      </TouchableOpacity>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
      />

      <Text style={styles.texthead}>
        {props.header}
      </Text>

      {props.ringring?
      <View style={styles.containerbad}>
        <View style={styles.rowbad}>
        <MaterialCommunityIcons style={styles.ringing} name="bell-ring" color={theme.colors.white} size={24} />
        <Badge style={styles.badgeStyle}>3</Badge>
        </View>
      </View>
    :null}

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 50,
    paddingVertical: 5,
    backgroundColor: '#3366CC',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  ringing: {
    
  },
  badgeStyle: { 
    position: 'absolute',
    top: -4,
    right: -4 
  },
  containerbad: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10,
  },
  rowbad: {
    flexDirection: 'row'
  },
})