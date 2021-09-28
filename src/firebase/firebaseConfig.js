import 'firebase/firestore';
import 'firebase/auth';
// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const   firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId:process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };

// if(process.env.NODE_ENV === 'test'){
//     var  firebaseConfig = {
//         apiKey: "AIzaSyB69CH7Lqf66HxsenQ-jr99fKRtCoRKl5I",
//         authDomain: "fitness-3776c.firebaseapp.com",
//         databaseURL: "https://fitness-3776c.firebaseio.com",
//         projectId: "fitness-3776c",
//         storageBucket: "fitness-3776c.appspot.com",
//         messagingSenderId: "135680912496",
//         appId: "1:135680912496:web:8c9ce9acb73912475dd8b5",
//         measurementId: "G-0W4NCKDBWC"
//       };
//     // Testing
   
// }else{
//     var firebaseConfig = {
//         apiKey: "AIzaSyDkce3E4mCqv-VAjjJmd71lwWW7TAV_Kpo",
//         authDomain: "react-app-9df71.firebaseapp.com",
//         projectId: "react-app-9df71",
//         storageBucket: "react-app-9df71.appspot.com",
//         messagingSenderId: "44676511828",
//         appId: "1:44676511828:web:cc5b9d5b58362358ddd5c1"
//     }
// }
// console.log(process.env);

const app = initializeApp(firebaseConfig);

const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider,
    app
}