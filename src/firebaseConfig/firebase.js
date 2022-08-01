import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCEEsh9edj6PYrsYvTOvxM0M5rVgCl6HZU',
  authDomain: 'react-crud-39bc2.firebaseapp.com',
  databaseURL: 'https://react-crud-39bc2-default-rtdb.firebaseio.com',
  projectId: 'react-crud-39bc2',
  storageBucket: 'react-crud-39bc2.appspot.com',
  messagingSenderId: '466349255355',
  appId: '1:466349255355:web:36f4ce6b8d1554f32c179e',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
