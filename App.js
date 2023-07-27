import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/public/Login';
import { AppContext } from './src/context/AppContext';
import Home from './src/screens/private/Home';
import Sound from './src/screens/private/Sound';
import Camera from './src/screens/private/Camera';
import Songs from './src/screens/private/Songs';
import Maps from './src/screens/private/Maps';

const Stack = createNativeStackNavigator();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

  return (
   <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
        <NavigationContainer>
            <Stack.Navigator>
               {
                !loggedIn ?
                <Stack.Screen name='Login' component={Login} options={{
                    headerShown: false,
                }} />
                : 
                <>
                    <Stack.Screen name='Home' component={Home} options={{
                        headerShown: true,
                    }} />
                    <Stack.Screen name='Sound' component={Sound} options={{
                        headerShown: true,
                    }} />
                    {/* <Stack.Screen name='Playlist' component={Songs} options={{
                        headerShown: true,
                    }} />
                    <Stack.Screen name='Camera' component={Camera} options={{
                        headerShown: false,
                    }} /> */}
                    <Stack.Screen name='Maps' component={Maps} options={{
                        headerShown: false,
                    }} />
                    
                </>
               }
                
            </Stack.Navigator>
        </NavigationContainer>
   </AppContext.Provider>
  )
}

export default App