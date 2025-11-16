import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Pages/Login';
import Registar from './src/Pages/Registar';
import Home from './src/Pages/Home';
import Welcome from './src/Pages/Welcome';
import Welcome2 from './src/Pages/Welcome2';
import WelcomeStartet from './src/Pages/WelcomeStartet';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome2">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registar"
          component={Registar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome2"
          component={Welcome2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelcomeStartet"
          component={WelcomeStartet}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
