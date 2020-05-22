import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { AnimatedRegion } from 'react-native-maps';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import OptionsMenu from "react-native-options-menu";

import Moment from 'moment';
import firebase from '@firebase/app';

require('firebase/auth');

export default class AddScheduledRun2 extends React.Component{

    state = { 
        target_location: [],
        target_location_data: [],
        initialRegion: null,
        errorMessage: null,
        max_orders: null,
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        scheduled_date: null,
        scheduled_time: null
    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {
        const location = this.props.navigation.getParam("location");
        this.setState({target_location: location})
        this.getLocation()
        this.getAddress()
    }
    async handlePost(){
        const user = firebase.auth().currentUser;
        const user_id = user.uid
        const target_location = this.state.target_location_data.result
        const date = this.state.scheduled_date
        const time = this.state.scheduled_time
        if(date == null || time == null){
            this.setState({errorMessage:"Please set a time"})
            return
        }
        const datetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());

        const data = {
            "destination": target_location,
            "description": this.state.description,
            "scheduled_time": datetime,
            "max_orders": Number(this.state.max_orders) || 10,
            "status": "active",
            "id": user_id,
            "post_time": new Date()
        }

        try {
            let response = await fetch(
                `https://afternoon-brook-22773.herokuapp.com/api/users/${user_id}/pickup`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
            }).then((response) => {
                if(response.status == 200 ||response.status == 201 ||response.status == 400){
                    this.props.navigation.dismiss()
                }
                else{
                    console.log(response.status)
                    this.setState({ errorMessage : "Your request couldn't be made"})
                }})
            }
            catch (error) {
                this.setState({ errorMessage: error.message })
            } 
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
            {maximumAge: 2000, timeout:20000}
        )    
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
                    <Text style={styles.topBarText}>Schedule Run</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
                    <MapView 
                    style={styles.mapView}
                    showsUserLocation = {true}
                    // customMapStyle={customMapStyle}

                    initialRegion={this.state.initialRegion}>
                        <MapView.Marker
                            coordinate={{latitude: this.state.target_lat, longitude: this.state.target_lng}}
                            title={location.structured_formatting.main_text}
                            description={location.description}
                            pinColor = {"#503D9E"}
                        />
                    </MapView>
                    <Text style={styles.locationTitle}>{location.structured_formatting.main_text}</Text>
                    <Text style={styles.locationSubtitle}>{location.description}</Text>
                    {/* <View style={styles.openingView}>
                        {this.state.target_location_data.result["opening_hours"]["weekday_text"].map((timing, index) => (
                            <Text style={styles.openingText}>{timing}</Text>

                        ))}
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>
                        <Text style={styles.openingText}>Monday: 10:45 AM – 10:00 PM</Text>

                    </View> */}


                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Add a description</Text>
                            <TextInput 
                            style={styles.inputDesc} 
                            autoCapitalize="none"
                            onChangeText={ description => this.setState({description})}
                            value={this.state.description}
                            multiline
                            placeholder={"I am going to starbucks and ..."}
                            ></TextInput>
                        </View>  
                        {/* <View style={{marginTop:25}}>
                            <Text style={styles.inputTitle}>Max Orders</Text>
                            <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText={ max_orders => this.setState({max_orders})}
                            value={this.state.max_orders}
                            keyboardType='numeric'
                            placeholder={"5"}
                            ></TextInput>
                        </View>    */}
                        <View style={{marginTop:32}}>
                            <Text style={styles.inputTitle}>When are you going there?</Text>
                            <DateTimePickerModal
                                mode="date"
                                isVisible={this.state.isDatePickerVisible}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                minimumDate={new Date()}
                            />
                            <DateTimePickerModal
                                mode="time"
                                isVisible={this.state.isTimePickerVisible}
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                                minuteInterval={15}
                                is24Hour={true}
                            />
                                <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={styles.button1} onPress={showTimePicker}>
                                            {this.state.scheduled_time != null &&
                                            <Text style={styles.buttonText1}>
                                                {Moment(this.state.scheduled_time).format('hh:mm')}
                                            </Text>   
                                            }
                                            {this.state.scheduled_time == null &&
                                            <Text style={styles.buttonText1}>
                                                Set Time
                                            </Text>   
                                            }
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button1} onPress={showDatePicker}>
                                        {this.state.scheduled_date != null &&
                                        <Text style={styles.buttonText1}>
                                            {Moment(this.state.scheduled_date).format('DD MMM, YYYY')} 
                                        </Text>   
                                            }
                                            {this.state.scheduled_date == null &&
                                            <Text style={styles.buttonText1}>
                                                Set Date
                                            </Text>   
                                            }        
                                    </TouchableOpacity>

                                </View>
                                {/* <OptionsMenu
                                button={require("../../assets/placeholder-add.jpg")}
                                buttonStyle={{ width: 32, height: 20, margin: 7.5, resizeMode: "contain" }}
                                destructiveIndex={1}
                                options={["Private", "Public", "Cancel"]}
                                /> */}
                                {/* // actions={[this.setState({privacy:"private"}), this.setState({privacy:"public"})]}/> */}
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.handlePost.bind(this)}>
                            <Text style={styles.buttonText}>Post</Text>
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
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        width:"100%",
        textAlign:"center",
        position:"absolute"
    },
    container:{
        flex: 1,
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
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
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        marginLeft:32
    },
    locationSubtitle:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
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
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` })
    },
    input:{
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 18,
        fontWeight: "400",
        color: "black",
        height: 50
    },
    inputDesc:{
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 16,
        fontWeight: "400",
        color: "black",
        minHeight: 50,
        maxHeight: 100

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
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15
    },
    buttonText:{
        color: "white",
        fontWeight: "400",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15
    },

    image:{
        height:32,
        width:27,
        position:'absolute'
    }
})
