import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig={
//     apiKey:"AIzaSyD-vx1w0Srwb9z2Eo-2pwa0aw4F2JvFjjE",
//     authDomain:"todo-auth-c6d65.firebaseapp.com",
//     projectId:"todo-auth-c6d65",
//     storageBucket:"todo-auth-c6d65.appspot.com",
//     messagingSenderId:"375011675918",
//     appId:"1:375011675918:web:d6253dbaada1b5324f115f",
//     measurementId:"G-DXQC554S0D"
// }

const firebaseConfig={
    apiKey:process.env.REACT_APP_APIKEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID
}

const app=initializeApp(firebaseConfig);

export const firestore=getFirestore(app);
export const auth=getAuth(app);
