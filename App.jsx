import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import Toast from 'react-native-toast-message';
import {loadProfile} from './src/services/AuthService';
import AuthContext from './contexts/AuthContext';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const runEffect = async () => {
      try {
        const user = await loadProfile();
        console.log(
          '🚀 ~ runEffect ~ loadUser:',
          JSON.stringify(user, null, 2),
        );
        setUser(user);
      } catch (e) {
        console.log('Failed to load user', e);
      }
      setStatus('idle');
    };

    runEffect();
  }, []);

  if (status === 'loading') {
    return <SplashScreen />;
  }

  console.log('🚀 ~ App ~ user:', user);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" visibilityTime={5000} />
    </AuthContext.Provider>
  );
};

export default App;
