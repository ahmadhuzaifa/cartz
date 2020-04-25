import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useRef } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import firebase from '@firebase/app';
require('firebase/auth');


export default function VerifyRecaptcha(props) {
    const recaptchaVerifierRef = React.useRef(null);
    const [code, setCode] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const [verifcationId, setVerificationID] = React.useState("");

    const [errorMessage, changeErrorMessage] = React.useState("");
    const [verifcation, changeVerification] = React.useState(false);
  
    const [confirmation, changeConfirmation] = React.useState(null);

    return (
      <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
          title='Prove you are human!'
          ref={recaptchaVerifierRef}
          cancelLabel='Close'
          firebaseConfig={firebase.app().options} />
            { !verifcation && 
            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Phone Number</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none" 
                    onChangeText={ phoneNumber => setPhoneNumber(phoneNumber)}
                    value={phoneNumber}
                    />
                </View> 
                <TouchableOpacity style={styles.button} onPress={
                async () => {
                    firebase.auth().settings.appVerificationDisabledForTesting = true;
                firebase.auth().currentUser.linkWithPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
                .then(function (confirmationResult) {
                    if(confirmationResult){
                        changeErrorMessage("")
                        setVerificationID(verifcationId)
                        changeVerification(true)
                        changeConfirmation(confirmationResult)
                    }
                })
                .catch(error => changeErrorMessage(error.message))
                }}
            >
            <Text style={styles.buttonText}>Send Code</Text>
            </TouchableOpacity>
            </View>  
            }
                                 
            { verifcation && 
            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Verification Code</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none" 
                    onChangeText={ code => setCode(code)}
                    value={code}/>
                </View>  
                <TouchableOpacity style={styles.button} onPress={
                    async () => {
                        confirmation.confirm(code).then(function (result) {
                            console.log(result)
                            //NEED TO ADD CODE HERE
                            changeErrorMessage("")                            


                        }).catch(function (error) {
                            changeErrorMessage(error.message)                            
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity> 
            </View>   

            }
          <View style={styles.errorMessage}>{<Text style={styles.error}>{errorMessage}</Text>}</View>

      </View>
    );
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
        height:67,
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
        marginTop: 30,
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