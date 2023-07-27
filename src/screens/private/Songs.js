import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../utils/colors'
import MusicIcon from '../../assets/images/iconSong.png'
import NavIcon from '../../assets/images/next.png'
import Play from '../../assets/images/play.png'
import Pause from '../../assets/images/pause.png'
import Stop from '../../assets/images/stop.png'
import { getFontSize } from '../../utils/fontSizeScale'
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const songs = [
  {
    name: 'Song 1',
    songSource: require('../../assets/sounds/song1.mp3'),
    description: "By Send Us Chour Track One"
  },
  {
    name: 'Song 2',
    songSource: require('../../assets/sounds/song2.mp3'),
    description: "By Send Us Chour Track Two"

  },
  {
    name: 'Song 3',
    songSource: require('../../assets/sounds/song3.mp3'),
    description: "By Send Us Chour Track Three"
  },
  {
    name: 'Song 4',
    songSource: require('../../assets/sounds/song4.mp3'),
    description: "By Send Us Chour Track Four"
  },
  {
    name: 'Song 5',
    songSource: require('../../assets/sounds/song5.mp3'),
    description: "By Send Us Chour Track Five"
  }
]
const Songs = () => {
  const [currentSong, setCurrentSong] = useState(songs[0].songSource);
  const [isPlaying, setIsPlaying] = useState(false);

    const sounds = new Sound(currentSong, Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          playSound();
          return;
        }
        console.log('duration in seconds: ' + sounds.getDuration() + 'number of channels: ' + sounds.getNumberOfChannels());
    });

    const playSound = () => {

        setIsPlaying(true)
        if(sounds.isPlaying){
          sounds.stop();
        }
        sounds.play((success) => {
            if (success) {
                setIsPlaying(false);
                console.log('successfully finished playing');
                sounds.release();
            } else {
            setIsPlaying(false)
                console.log(success, 'playback failed due to audio decoding errors');
            }
        })
  
    }

    const stopSound = () => {
      setIsPlaying(false);
      if(sounds.isPlaying){
        sounds.stop();
      }
    }

    const pauseSound = () => {
      setIsPlaying(false);
      sounds.pause(() => {
        sounds.release();
      });
    }
    sounds.release();
  const renderSongItem = ({ item, indx }) => {
    return (<TouchableOpacity onPress={() => {
      setCurrentSong(item.songSource);
      // stopSound();
      playSound();
    }} activeOpacity={.6} style={styles.songButton} key={indx}>
              <Image source={MusicIcon} style={styles.musicIcon} />
              <View>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.songDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>)
  }
  return (
    <View>
      <Text style={styles.title}>Songs</Text>
      <View>
        <FlatList
          data={songs}
          renderItem={renderSongItem}
          style={{ height: 500 }}
        />
      </View>
      <View style={{ borderWidth: 1, borderColor: colors.primary, borderRadius: 20, width: '55%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <TouchableOpacity style={styles.PrevNavButton}>
          <Image source={NavIcon} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopSound} style={styles.PlayNavButton}>
          <Image source={Stop} style={[styles.navIcon, { resizeMode: 'cover' }]}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { isPlaying ? pauseSound() : playSound() }} style={styles.PlayNavButton}>
          <Image source={isPlaying ? Pause : Play } style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.NextNavButton}>
          <Image source={NavIcon} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Songs

const styles = StyleSheet.create({
  PrevNavButton: {
   transform: [{ rotate: '180deg'}], 
   borderWidth: 1,
   borderColor: colors.black,
   height: 50,
   width: 50,
   borderRadius: 20,
   justifyContent: 'center',
   alignItems: 'center',
  },
  NextNavButton: {
    borderWidth: 1,
    borderColor: colors.black,
    height: 50,
    width: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
   },
   PlayNavButton: { 
    borderWidth: 1,
    borderColor: colors.black,
    height: 50,
    width: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
   },
  navIcon: {
    width: 30,
    height: 30,
  },
  songDescription: {
    fontFamily: 'Quicksand-Light',
    color: colors.black,
    fontSize: 12,
  },
  songButton: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    gap: 10,
    marginBottom: 5,
    padding: 10,
    alignSelf: 'center',
  },
  songName: {
    fontSize: 28,
    fontFamily: 'Quicksand-Regular',
    color: colors.black
  },
  musicIcon: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: colors.black
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    color: colors.primary,
    fontSize: getFontSize(40),
    textAlign: 'center',
    marginBottom: 20,
  },

})