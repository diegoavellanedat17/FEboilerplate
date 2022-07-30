// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFUU5HOzaTYr1kcfhwlt52Ad4qbUFMGA4',
  authDomain: 'indoor-location-85a5b.firebaseapp.com',
  projectId: 'indoor-location-85a5b',
  storageBucket: 'indoor-location-85a5b.appspot.com',
  messagingSenderId: '1017883031276',
  appId: '1:1017883031276:web:5163342056d0ee318dd7c9',
  measurementId: 'G-CD3EE81L1H'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
