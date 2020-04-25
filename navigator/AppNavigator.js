
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen"
import OrderScreen from "../screens/orderScreen"
import TabNavigator from "./TabBar";
import LoadingScreen from "../screens/loadingScreen.js";
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import PhoneNumberScreen from "../screens/phoneNumberScreen";
import AddAdress from "../screens/addAddress"
import firebase from '@firebase/app';
require('firebase/auth');

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


const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Order: OrderScreen
},
{ 
    mode: "modal"
})

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
        Auth2Stack: VerificationStack,
        FinalAuthStack: FinalAuthStack
    },
    {
        initialRouteName:"Loading"
    }
    )
);
