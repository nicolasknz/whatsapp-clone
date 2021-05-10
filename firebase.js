import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBlNAgSVjy0rL98zsiE0LllqPB6ctbjv6s",
    authDomain: "whatsapp-clone-17b58.firebaseapp.com",
    projectId: "whatsapp-clone-17b58",
    storageBucket: "whatsapp-clone-17b58.appspot.com",
    messagingSenderId: "73370854404",
    appId: "1:73370854404:web:a4c6b2b72e97b600e68151"
};

// Step import for SSR, if already initialized, used the one initialized, otherwise initialize a new one
const app = !firebase.apps.length 
    ? new firebase.initializeApp(firebaseConfig) 
    : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
