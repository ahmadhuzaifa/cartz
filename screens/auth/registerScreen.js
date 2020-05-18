import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/firestore');

export default class LoginScreen extends React.Component{

    state = { 
        email: "",
        password:"",
        name: "",
        errorMessage:null
    }

    static navigationOptions = {
        headerShown:false
    }

    handleSignup = () =>{
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            userCredentials.user.updateProfile({
                displayName: this.state.name
            })
            const uid = userCredentials.user.uid
            firebase.firestore().collection("users").doc(uid).set({
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
            })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.topBar} >
                        <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Ionicons 
                                name="ios-arrow-back" 
                                size={20} 
                                color="#546bfb"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>Register</Text>
                    </View>
                    <ScrollView keyboardDismissMode={false}>
                    <Text style={styles.greeting}>{`Welomce \nto Cartz!`}</Text>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ name => this.setState({name})}
                            value={this.state.name}
                            ></TextInput>
                        </View>   

                        <View style={{marginTop:32}}>
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
                        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
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
       fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
       width:"100%",
        textAlign:"center",
        position:"absolute"
    },
    container:{
        flex: 1,
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        backgroundColor:"white"
    },
    safeAreaContainer:{
    },
    greeting:{
        marginTop: 25,
        fontSize: 25,
        fontWeight: "600",
        textAlign: "left",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
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
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
    },
    input:{
        borderBottomColor: "#503D9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
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
        marginBottom: 240
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15
    }
})
