import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"

import firebase from '@firebase/app';
require('firebase/auth');

export default class LoginScreen extends React.Component{
    state = { 
        email: "",
        password:"",
        errorMessage:null
    }

    handleLogin = () => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView keyboardDismissMode={true}>
                <Text style={styles.greeting}>{`Hello again \n Welcome back`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={ email => this.setState({email})}
                        value={this.state.email}
                        />
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize="none"
                        onChangeText={ password => this.setState({password})}
                        value={this.state.password}
                        ></TextInput>
                    </View>   
                </View>
                <View>

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf:"center", marginTop:32}}>
                        <Text style={{color:"gray", fontSize:13}}>
                            New to Cartz? <Text style={{color:"black", fontWeight:"500"}}>Sign up</Text>
                            </Text>
                    </TouchableOpacity>


                </View>
                </ScrollView>
            </View>


        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    greeting:{
        marginTop: 25,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center" 
    },
    errorMessage:{
        height:72,
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
        marginHorizontal: 30
    },
    inputTitle:{
        color: "gray",
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    input:{
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 60,
        fontSize: 15,
        color:"black"
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        color:"white",
    },
    buttonText:{
        color: "white",
        fontWeight: "500"
    }
})
