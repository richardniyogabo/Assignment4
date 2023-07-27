import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RNCamera } from 'react-native-camera';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Camera = () => {
    const [images, setImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    
    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        const data = await AsyncStorage.getItem('images');
        if(data){
            setImages(JSON.parse(data));
        }else{

        }
    }

    const takePicture = async (camera) => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            setImages([...images, data.uri]);
            const dataArr = JSON.stringify([...images, data.uri]);
            await AsyncStorage.setItem('images', dataArr);
            setIsCapturing(false);
        }
    };

    const PendingView = () => (
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Waiting</Text>
        </View>
      );
  return (
    <View style={styles.container}>
        { isCapturing ? <View>
            <RNCamera
            style={styles.preview}
            type='back'
            flashMode='auto'
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            >
                  {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                        <View style={{ marginTop: 100 ,flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                            <Text style={{ fontSize: 14, color: colors.black }}> TAKE PIC </Text>
                            </TouchableOpacity>
                        </View>
                        );
                }}
            </RNCamera>

        </View> 
        :   
        <View>
            <TouchableOpacity onPress={() => setIsCapturing(true)} style={styles.capture}>
                <Text style={{ fontSize: 14, color: colors.black }}> Camera On </Text>
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                gap: 4,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    images?.map((item, idx) => <Image key={idx} source={{ uri: item }} style={{ width: 150, height: 150, }} />)
                }
            </View>
        </View>}
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})