import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
//initiallized firebase with credentials
const app = firebase.initializeApp({
  apiKey: "AIzaSyD1r23cY_7f0h15je0VzYeaLW4s3ZXnX-4",
    authDomain: "quickstart-1561522208424.firebaseapp.com",
    databaseURL: "https://quickstart-1561522208424.firebaseio.com",
    projectId: "quickstart-1561522208424",
    storageBucket: "quickstart-1561522208424.appspot.com",
    messagingSenderId: "680937444803",
    appId: "1:680937444803:web:233c2e0999c624d4181976",
    measurementId: "G-FYE79X0S19"
});

export default app;
