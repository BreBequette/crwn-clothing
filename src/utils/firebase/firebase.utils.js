import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6ZtsfaOjpNrK2NlER63ZfL4A8B8aOWps",
    authDomain: "crwn-clothing-db-94bb3.firebaseapp.com",
    projectId: "crwn-clothing-db-94bb3",
    storageBucket: "crwn-clothing-db-94bb3.appspot.com",
    messagingSenderId: "722539150285",
    appId: "1:722539150285:web:b945252495e1b6842f2284"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        } catch (error){
            console.log("Error creating user: ", error.message);
        }
    }

    return userDocRef;
}
