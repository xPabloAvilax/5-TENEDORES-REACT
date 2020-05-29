import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzyKmFUtP9UkO77g5uDdbzhK7H5V_yBRo",
  authDomain: "tenedores-e3f08.firebaseapp.com",
  databaseURL: "https://tenedores-e3f08.firebaseio.com",
  projectId: "tenedores-e3f08",
  storageBucket: "tenedores-e3f08.appspot.com",
  messagingSenderId: "1051712609552",
  appId: "1:1051712609552:web:ba24e76b733ea7d0ec1995",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
