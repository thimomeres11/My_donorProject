// src/config/Firebase/index.tsx
import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

// 🔥 MASUKKAN CONFIG FIREBASE MU DI SINI
const firebaseConfig = {
  apiKey: 'AIzaSyBJXvGf4nneQ0mCUF4S_yOZa9o5BnIVPYw',
  authDomain: 'mydonorprojek.firebaseapp.com',
  projectId: 'mydonorprojek',
  storageBucket: 'mydonorprojek.firebasestorage.app',
  messagingSenderId: '470416201010',
  appId: '1:470416201010:web:cfc3fee913badfe42db32b',
  databaseURL: 'https://mydonorprojek-default-rtdb.firebaseio.com/',
};

// 🔥 Initialize Firebase HANYA sekali
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 🔥 Export Auth & Database
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
