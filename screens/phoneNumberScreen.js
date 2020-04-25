import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useRef } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import firebase from '@firebase/app';
require('firebase/auth');

import VerifyRecaptcha from "../components/firebaseRecaptcha.js"

export default class PhoneNumberScreen extends React.Component{

    state = { 
        phoneNumber:"",
        confirmResult: null,
        verificationCode: '',
        userId: '', 
        errorMessage:"",
        verified: false
    }

    static navigationOptions = {
        headerShown:false
    }

    render(){

      
        return(

            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>

                    <View style={styles.topBar} >
                        <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() => {
                            firebase.auth().signOut()
                        }}>
                            <Ionicons 
                                name="ios-close" 
                                size={35} 
                                color="#546bfb"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>Almost There!</Text>
                    </View>
                    <ScrollView keyboardDismissMode={true}>
                    <Text style={styles.greeting}>{`Please enter your \nphone number!`}</Text>
                    <View style={styles.errorMessage}>{<Text style={styles.error}>{this.state.errorMessage}</Text>}</View>
  
                    <VerifyRecaptcha 
                    phoneNumber={this.state.phoneNumber}
                    navigation={this.props.navigation}/>


                    </ScrollView>
                </SafeAreaView>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    topBar:{
        height:56,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        zIndex:1 
    },
    closeButton:{
        backgroundColor: "#FCD460",
        borderRadius: 30,
        height: 46,
        width:46,
        left:20,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    topBarText:{
       color: "#503D9E",
       fontWeight: "600",
       fontSize: 19,
       fontFamily: "Avenir Next",
        width:"100%",
        textAlign:"center",
        position:"absolute"
    },
    container:{
        flex: 1,
        fontFamily: "Avenir Next",
        backgroundColor:"white"
    },
    safeAreaContainer:{
    },
    greeting:{
        marginTop: 25,
        fontSize: 25,
        fontWeight: "600",
        textAlign: "left",
        fontFamily: "Avenir Next",
        marginLeft:32
    },
    errorMessage:{
        height:47,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error:{
        color:"red",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form:{
        marginBottom:46,
        marginHorizontal: 30,
    },
    inputTitle:{
        color: "black",
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: "bold",
        fontFamily: "Avenir Next"
    },
    input:{
        borderBottomColor: "#503D9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontFamily: "Avenir Next",
        fontSize: 18,
        fontWeight: "400",
        color: "black",
        height: 60
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "#503D9E",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        color:"white",
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: "Avenir Next",
        fontSize: 15
    }
})
