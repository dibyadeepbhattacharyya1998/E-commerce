import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD_RCaZOXGr5W2v0LWSr-QoZvchnlpT6wY",
    authDomain: "e-commerce-db-b3586.firebaseapp.com",
    databaseURL: "https://e-commerce-db-b3586.firebaseio.com",
    projectId: "e-commerce-db-b3586",
    storageBucket: "e-commerce-db-b3586.appspot.com",
    messagingSenderId: "74931519886",
    appId: "1:74931519886:web:9e32d089e2e54888a1e4df",
    measurementId: "G-D9JSFDWDT0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
