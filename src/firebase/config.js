import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBS5kL6qJMVJzz3ig8aa3Yrg8vGsOBSkAg',
  authDomain: 'photo-box-cec26.firebaseapp.com',
  projectId: 'photo-box-cec26',
  storageBucket: 'photo-box-cec26.appspot.com',
  messagingSenderId: '328918609067',
  appId: '1:328918609067:web:99742c2244058f99ce1bee',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

export { app as default, auth, db, storage }
