import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import '@firebase/firestore'
require('firebase/auth');
require("firebase/firestore");

const domain = "https://afternoon-brook-22773.herokuapp.com"


export default class AddAddress extends React.Component{

    state = { 
        address: "",
        errorMessage:null,
        predictions:[]
    }

    static navigationOptions = {
        headerShown:false
    }

    async handlePost (address) {
        const user = firebase.auth().currentUser;
        const user_id = user.uid
        const data = {
            house_address:address
        }
        console.log(user_id)
        try {
            const apiURL = domain + `/api/users/${user_id}/address`
            let response = await fetch(
                apiURL,
                {
                    method: "PUT",
                    headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if(response.status == 200 || response.status == 201){
                this.props.navigation.goBack()
            }
            else{
                this.setState({ errorMessage: "An error occurred" })
            }
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
        } 
    }

    async onChangeDestination (destination){
        this.setState({destination:destination.location})
        const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination.location}&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA&sessiontoken=1234567890&radius=500`;
        try{
            const results = await fetch(apiURL);
            const json = await results.json()
            this.setState({predictions:json.predictions})
        }
        catch (err){
            this.setState({errorMessage:error.message})
        }
    }

    render(){
        const predictions = this.state.predictions.map(prediction => (
            <TouchableOpacity key={prediction.id} onPress={()=>{
                this.handlePost(prediction.description)
                }} >
                <View style={styles.predictionView}>
                    <Text style={styles.predictionText}>{prediction.structured_formatting.main_text}</Text>
                    <Text style={styles.predictionSubText}>{prediction.structured_formatting.secondary_text}</Text>
                </View>
            </TouchableOpacity>
        ));
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.topBar} >
                        <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                                <Text style={{color:"#503D9E", fontWeight:"600"}}>Later</Text>
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>Address</Text>
                    </View>
                    <ScrollView keyboardDismissMode={true}>
                    <Text style={styles.greeting}>{`What's your \nAddress?`}</Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Address</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ location => this.onChangeDestination({location})}
                            value={this.state.destination}
                            placeholder={"Start typing..."}
                            ></TextInput>
                        </View>   
                        {predictions}
                    </View>
                    {/* <View>
                        <TouchableOpacity style={styles.button} onPress={this.handlePost}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View> */}
                    </ScrollView>
                </SafeAreaView>
            </View>


        )
    }
}


const styles = StyleSheet.create({
    topBar:{
        height:70,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        zIndex:1 
    },
    closeButton:{
        backgroundColor: "#FCD460",
        borderRadius: 20,
        height: 55,
        width:70,
        right:20,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        position:"absolute"
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
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15
    },

    predictionView:{
        height:40,
        justifyContent:"center",
    },
    predictionText:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "600",
        fontSize: 15,
    },
    predictionSubText:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "600",
        fontSize: 12,
    },
})
