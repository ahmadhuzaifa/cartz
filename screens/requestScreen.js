import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { AnimatedRegion } from 'react-native-maps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import firebase from '@firebase/app';

require('firebase/auth');

export default class RequestScreen extends React.Component{

    state = { 
        target_location: [],
        target_location_data: [],
        initialRegion: null,
        errorMessage: null,
        max_orders: 0,
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        scheduled_date: new Date(),
        scheduled_time: new Date()
    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {

    }


    async getAddress(){
        const location = this.props.navigation.getParam("location");
        const apiURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.place_id}&=&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`

        // const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.description}&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`

        try{
            const results = await fetch(apiURL);
            const json = await results.json()
            this.setState({target_location_data:json})
            const geometry = json.result.geometry.location
            this.setState({target_lat:geometry.lat, target_lng: geometry.lng})
        }
        catch (err){
            console.log(err)
            this.setState({errorMessage:err.message})
        }
    }


    render(){
 

        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.topBar} >
                        <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Ionicons 
                                name="ios-arrow-back" 
                                size={15} 
                                color="#546bfb"/>
                        </TouchableOpacity>
                    <Text style={styles.topBarText}>Request</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
       

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>What items do you need?</Text>
              
                                <View style={{display:"row", flexDirection: "row", justifyContent: 'space-between'}}>

                                </View>
                  
                        </View>   
                        <View style={{marginTop:32}}>
                            <Text style={styles.inputTitle}>Add a description</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ description => this.setState({description})}
                            value={this.state.description}
                            placeholder={"I am going to starbucks and ..."}
                            ></TextInput>
                        </View>  
                        <View style={{marginTop:25}}>
                            <Text style={styles.inputTitle}>Max Orders</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ budget => this.setState({budget})}
                            value={this.state.budget}
                            keyboardType='numeric'
                            ></TextInput>
                        </View>   
      
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Post!</Text>
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
    openingView:{
        marginRight:32,
        marginLeft:32,
        marginTop: 10
    },openingText:{
        color:"gray"  
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
        backgroundColor:"white",
        height: 1000
    },
    mapView:{
        height:200
    },
    dateTimePicker:{
        color: "black"
    },
    locationTitle:{
        marginTop: 25,
        fontSize: 25,
        fontWeight: "600",
        textAlign: "left",
        fontFamily: "Avenir Next",
        marginLeft:32
    },
    locationSubtitle:{
        fontFamily: "Avenir Next",
        fontWeight: "500",
        fontSize: 15,
        marginLeft: 32,
        marginRight: 32

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
        marginBottom: 300
    },
    button1:{
        width: "45%",
        borderColor: "#503D9E",
        borderWidth: 1,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        color:"white",
        marginTop: 10
    },
    buttonText1:{
        color: "#503D9E",
        fontWeight: "400",
        fontFamily: "Avenir Next",
        fontSize: 15
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: "Avenir Next",
        fontSize: 15
    },

    image:{
        height:32,
        width:27,
        position:'absolute'
    }
})
