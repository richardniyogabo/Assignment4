import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import { trigger } from "react-native-haptic-feedback";
import Sound from 'react-native-sound';

Sound.setCategory('SoloAmbient');
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
const Sounds = ({ navigation }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const triggerAction = (value) => {
        trigger(value, options);
    }
    const sounds = new Sound(require('../../assets/sounds/notification.mp3'), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + sounds.getDuration() + 'number of channels: ' + sounds.getNumberOfChannels());
    });

    const playSound = () => {
        setIsPlaying(true)
        sounds.play((success) => {
            if (success) {
            setIsPlaying(false);
                console.log('successfully finished playing');
            } else {
            setIsPlaying(false)
                console.log('playback failed due to audio decoding errors');
            }
        });
    }

  return (
    <View>
        <TouchableOpacity onPress={() => triggerAction('impactLight')} activeOpacity={.6} style={styles.promptButton}>
            <Text style={styles.buttonText}>Vibrate Light.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => triggerAction('impactHeavy')} activeOpacity={.6} style={styles.promptButton}>
            <Text style={styles.buttonText}>Vibrate Heavy.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => triggerAction('rigid')} activeOpacity={.6} style={styles.promptButton}>
            <Text style={styles.buttonText}>Vibrate Rigid.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => triggerAction('soft')} activeOpacity={.6} style={styles.promptButton}>
            <Text style={styles.buttonText}>Vibrate Soft.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => triggerAction('notificationSuccess')} activeOpacity={.6} style={styles.promptButton}>
            <Text style={styles.buttonText}>Vibrate Notification Success.</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isPlaying} onPress={playSound} activeOpacity={.6} style={[styles.promptButton, { backgroundColor: isPlaying ? '#4c4c4c' : colors.primary }]}>
            <Text style={styles.buttonText}>{isPlaying ? 'Playing...' : 'Play Notification Sound.'}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Sounds

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