import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, ActivityIndicator} from "react-native"

import firebase from '@firebase/app';
require('firebase/auth');


export default class LoginScreen extends React.Component{
    static navigationOptions = {
        headerShown:false
    }

    state = { 
        email: "",
        password:"",
        errorMessage:null,
        isLoading: false
    }
    componentDidMount(){
        StatusBar.setBarStyle("dark-content", true)

    }
    handleLogin = () => {
        this.setState({ isLoading: true }); 
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ isLoading: false }); 
            const user = firebase.auth().currentUser
            const user_id = user.uid
        })
        .catch(error => this.setState({errorMessage: error.message, isLoading: false}))
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.topBar} >
                        <Text style={styles.topBarText}>Sign In</Text>
                    </View>
                    <ScrollView keyboardDismissMode={true}>

                    <Text style={styles.greeting}>{`Hello again, \nWelcome back`}</Text>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            placeholder="Email" 
                            onChangeText={ email => this.setState({email})}
                            value={this.state.email}
                            />
                        </View>
                        {this.state.isLoading &&
                                <View style={{flex : 1, justifyContent: 'center', alignItems: 'center',}}>
                                    <ActivityIndicator style={{position:"absolute"}} color={"black"} />
                                </View>
                        }
                        <View style={{marginTop:32}}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput 
                            style={styles.input} 
                            secureTextEntry 
                            autoCapitalize="none"
                            placeholder="Password" 
                            onChangeText={ password => this.setState({password})}
                            value={this.state.password}
                            ></TextInput>
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{alignSelf:"center", marginTop:32}} 
                            onPress={ () => this.props.navigation.navigate("RegisterScreen")}
                        >
                            <Text style={{color:"gray", fontSize:13}}>
                                New to Cartz? <Text style={{color:"black", fontWeight:"500"}}>Sign up</Text>
                                </Text>
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
        backgroundColor: "white"
    },
    greeting:{
        marginTop: 30,
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
        marginHorizontal: 30
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
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15
    }
})
