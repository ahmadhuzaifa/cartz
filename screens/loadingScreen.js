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
                if (user.phoneNumber){
                    stack = "App"
                }
                else{
                    stack = "PhoneNumberAuth"
                }
            }
            this.props.navigation.navigate(stack)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>loading...</Text>
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
