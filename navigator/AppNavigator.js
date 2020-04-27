
//NECESSARY IMPORTS
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import firebase from '@firebase/app';
require('firebase/auth');

//ALL THE SCREENS
import LoadingScreen from "../screens/loadingScreen.js";
import RegisterScreen from "../screens/auth/registerScreen";
import LoginScreen from "../screens/auth/loginScreen";
import PhoneNumberScreen from "../screens/auth/phoneNumberScreen";
import AddAdress from "../screens/auth/addAddress"

// THE APP TABBAR NAVIGATOR
import TabNavigator from "./TabBar";

// FIREBASE CONFIG
var firebaseConfig = {
    apiKey: "AIzaSyDIwk9Mpja7yKex1-lOYZ-fy-B-RcB3mCw",
    authDomain: "cartz-d6c0b.firebaseapp.com",
    databaseURL: "https://cartz-d6c0b.firebaseio.com",
    projectId: "cartz-d6c0b",
    storageBucket: "cartz-d6c0b.appspot.com",
    messagingSenderId: "692312204680",
    appId: "1:692312204680:web:967d51c17493b681de463d",
    measurementId: "G-3YR86W2XE1"
};
firebase.initializeApp(firebaseConfig);


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    RegisterScreen: RegisterScreen
})

const VerificationStack = createStackNavigator({
    PhoneNumberScreen: PhoneNumberScreen
})

const FinalAuthStack = createStackNavigator({
    AddAdress: AddAdress
})

export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen, 
        App: TabNavigator,
        Auth: AuthStack,
        PhoneNumberAuth: VerificationStack,
        FinalAuthStack: FinalAuthStack
    },
    {
        initialRouteName:"Loading"
    })
);
