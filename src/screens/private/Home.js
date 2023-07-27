import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'

const Home = ({ navigation }) => {
  return (
    <View>
      <Text style={{ color: 'black', fontSize: 18 }}>Welcome Home</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Sound')} activeOpacity={.6} style={styles.promptButton}>
        <Text style={styles.buttonText}>Sounds.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Maps')} activeOpacity={.6} style={styles.promptButton}>
        <Text style={styles.buttonText}>Maps.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Playlist')} activeOpacity={.6} style={styles.promptButton}>
        <Text style={styles.buttonText}>Playlist.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')} activeOpacity={.6} style={styles.promptButton}>
        <Text style={styles.buttonText}>Camera.</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    promptButton: {
        width: '80%',
        height: 50,
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontFamily: 'Quicksand-Regular',
        color: colors.white
    },
})