import { FirebaseOptions, initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import {
    getFirestore,
    initializeFirestore,
    memoryLocalCache,
    persistentLocalCache,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
initializeFirestore(app, { localCache: persistentLocalCache() })
const firebaseRealtimeDB = getDatabase(app)
const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
const firestore = getFirestore(app)
const storage = getStorage(app)

export { firebaseRealtimeDB, firebaseAuth, firestore, storage }
