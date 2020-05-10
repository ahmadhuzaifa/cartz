import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import GooglePlacesInput from "../../components/googlePlacesSearch"
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/firestore');

export default class AddScheduledRun extends React.Component{

    state = { 
        name: "",
        latitude:0,
        longitude: 0,
        destination: "",
        predictions:[],
        errorMessage:null
    }

    static navigationOptions = {
        headerShown:false
    }
    componentDidMount(){
        this.getLocation()
    }
    async getLocation() {
        navigator.geolocation.getCurrentPosition(
            position =>{
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            error => this.setState({errorMessage: error.message}),
            {enableHighAccuracy:true, maximumAge: 2000, timeout:20000}
        )
    }

    async onChangeDestination (destination){
        this.setState({destination:destination.location})
        const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination.location}&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA&sessiontoken=1234567890&location=${this.state.latitude},${this.state.longitude}&radius=500`;
        // const apiURL = `https://api.yelp.com/v3/autocomplete?text=${destination.location}&latitude=37.786882&longitude=-122.399972`

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
            this.props.navigation.navigate("AddRun2",{
                location: prediction
            })}} >
            <View style={styles.predictionView}>
                <Image style={styles.image} source={require('../../assets/map-marker.png')} />
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
                            this.props.navigation.dismiss()
                        }}>
                            <Ionicons 
                                name="ios-close" 
                                size={30} 
                                color="#546bfb"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarText}>Add Run</Text>
                    </View>
                    <ScrollView keyboardDismissMode={true}>
                    <Text style={styles.greeting}>{`Where are \nyou going?`}</Text>
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Location</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ location => this.onChangeDestination({location})}
                            value={this.state.destination}
                            ></TextInput>
                        </View>   
                        {predictions}
                    </View>
                    <View>
                        {/* <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                            <Text style={styles.buttonText}>Lets go</Text>
                        </TouchableOpacity> */}
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
        alignItems: "center",
        position:"absolute"
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
        marginBottom: 240
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: "Avenir Next",
        fontSize: 15
    },
    predictionView:{
        height:60,
        justifyContent:"center",
    },
    predictionText:{
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 35
    },
    predictionSubText:{
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 12,
        marginLeft: 35
    },
    image:{
        height:32,
        width:27,
        position:'absolute'
    }
})
