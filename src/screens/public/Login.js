import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getFontSize } from '../../utils/fontSizeScale'
import colors from '../../utils/colors'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { AppContext } from '../../context/AppContext'


const Login = () => {
    const { setLoggedIn } = useContext(AppContext);

    useEffect(() => {
        getBiometrics();
    }, []);

    const getBiometrics = async () => {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
        const { biometryType } = await rnBiometrics.isSensorAvailable();
        if (biometryType === BiometryTypes.Biometrics) {
            rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
            .then((resultObject) => {
                const { success } = resultObject
                if (success) {
                   setLoggedIn(true);
                } else {
                    Alert.alert('Assignment4', 'Fingerprint is incorrect.')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>Boimetrics Login</Text>
      <TouchableOpacity onPress={getBiometrics} activeOpacity={.6} style={styles.promptButton}>
        <Text style={styles.buttonText}>Prompt Fingerprint.</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

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
        fontFamily: 'Quicksand-Regular'
    },
    container: {
        width: '100%',
        height: '100%',
    },
    loginHeader: {
        fontFamily: 'Quicksand-Bold',
        fontWeight: 'bold',
        fontSize: getFontSize(40),
        color: colors.primary,
        alignSelf: 'center',
        marginTop: 100,
    }
})