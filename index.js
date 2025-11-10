/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/Pages/Login';
import Registar from './src/Pages/Registar';

AppRegistry.registerComponent(appName, () => Registar);
