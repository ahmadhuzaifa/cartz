import React from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/firestore');

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            var stack = "Auth"
            if (user){
                if (user.phoneNumber != null){
                    stack = "App"
                }
                else{
                    stack = "PhoneNumberAuth"
                }
            }
            this.props.navigation.navigate(stack)
        })
    }
    checkUser(uid){
        const apiURL = `https://afternoon-brook-22773.herokuapp.com/api/users/${uid}`;
        fetch(apiURL, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson){
                console.log(responseJson);
                return "App"
            }
            else{
                return "AddAddress"
            }
        })
        .catch((error) => {
            console.error(error);
            return "AddAddress"
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:"black",fontWeight: "600", fontSize:12}}>Loading...</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
