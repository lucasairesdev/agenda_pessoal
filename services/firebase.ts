"use client"
import { data } from "autoprefixer";
import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBBhMkPsQdecjDX65EpsZeyYCxZkbv6K28",
    authDomain: "agendapessoal-282cd.firebaseapp.com",
    projectId: "agendapessoal-282cd",
    storageBucket: "agendapessoal-282cd.appspot.com",
    messagingSenderId: "1047962906048",
    appId: "1:1047962906048:web:2c2992b6226bcf8c10ac25"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }else{
    firebase.app();
  }


const database = firebase.database();

export {database, firebase}