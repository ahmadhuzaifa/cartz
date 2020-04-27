import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { AnimatedRegion } from 'react-native-maps';
import DateTimePickerModal from "react-native-modal-datetime-picker";

require('firebase/auth');
require('firebase/firestore');

export default class AddScheduledRun2 extends React.Component{

    state = { 
        target_location: null,
        initialRegion: null,
        errorMessage: null,
        scheduled_date: null,
        max_orders: 0,
        isDatePickerVisible: false,
        isTimePickerVisible: false
    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {
        this.getLocation()
        this.getAddress()
    }

    async getLocation() {
        navigator.geolocation.getCurrentPosition(
            position =>{
                let region= {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }
                this.setState({
                    initialRegion: region
                })
            },
            error => this.setState({errorMessage: error.message}),
            {enableHighAccuracy:true, maximumAge: 2000, timeout:20000}
        )    
    }

    async getAddress(){
        const location = this.props.navigation.getParam("location");
        const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.description}&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`
        try{
            const results = await fetch(apiURL);
            const json = await results.json()
            const geometry = json.results[0].geometry.location
            this.setState({target_lat:geometry.lat, target_lng: geometry.lng})
        }
        catch (err){
            console.log(err)
            this.setState({errorMessage:err.message})
        }
    }

    render(){
        const location = this.props.navigation.getParam("location");
 
        const showDatePicker = () => {
            this.setState({isDatePickerVisible:true});
        };
       
        const hideDatePicker = () => {
          this.setState({isDatePickerVisible:false});
        };
       
        const handleConfirm = (date) => {
        this.setState({scheduled_date:date});

          hideDatePicker();
        };


        const showTimePicker = () => {
            this.setState({isTimePickerVisible:true});
        };
       
        const hideTimePicker = () => {
          this.setState({isTimePickerVisible:false});
        };
       
        const handleTimeConfirm = (time) => {
        this.setState({scheduled_time:time});

        hideTimePicker();
        };
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
                    <Text style={styles.topBarText}>Add Run</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
                    <MapView 
                    style={styles.mapView}
                    showsUserLocation = {true}
                    initialRegion={this.state.initialRegion}>
                        <MapView.Marker
                            coordinate={{latitude: this.state.target_lat, longitude: this.state.target_lng}}
                            title={location.structured_formatting.main_text}
                            description={location.description}
                        />
                    </MapView>
                    <Text style={styles.locationTitle}>{location.structured_formatting.main_text}</Text>
                    <Text style={styles.locationSubtitle}>{location.description}</Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Max Orders</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ max_orders => this.setState({max_orders})}
                            value={this.state.max_orders}
                            numeric value = {true}
                            keyboardType={'numeric'}
                            ></TextInput>
                        </View>   
                        <View style={{marginTop:32}}>
                            <Text style={styles.inputTitle}>When are you going there?</Text>
                            <DateTimePickerModal
                                mode="date"
                                isVisible={this.state.isDatePickerVisible}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <DateTimePickerModal
                                mode="time"
                                isVisible={this.state.isTimePickerVisible}
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                            <View>
                                <Button title={"time"} style={styles.dateTimePicker} onPress={showTimePicker} />
                                <Button title={"date"} style={styles.dateTimePicker} onPress={showDatePicker} />

                            </View>
                  
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
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
        marginBottom: 240
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
