// App.tsx
import 'react-native-gesture-handler'; // penting jika pakai gesture handler (taruh paling atas)
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens (sesuaikan path bila beda)
import Login from './src/Pages/Login';
import Registar from './src/Pages/Registar';
import Home from './src/Pages/Home';
import CekStokDarah from './src/Pages/CekStokDarah';

/**
 * Root param list supaya navigate punya typing yang jelas (opsional tapi berguna)
 */
export type RootStackParamList = {
  Login: undefined;
  Registar: undefined;
  Home: undefined;
  CekStokDarah: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      {/* status bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registar" component={Registar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CekStokDarah" component={CekStokDarah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
