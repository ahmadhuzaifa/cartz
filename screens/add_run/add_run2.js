import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { AnimatedRegion } from 'react-native-maps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import firebase from '@firebase/app';

require('firebase/auth');

export default class AddScheduledRun2 extends React.Component{

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
        const location = this.props.navigation.getParam("location");
        this.setState({target_location: location})
        this.getLocation()
        this.getAddress()
    }
    async handlePost(){
        const user = firebase.auth().currentUser;
        const user_id = user.uid
        const target_location = this.state.target_location_data.result
        const time = Moment(this.state.scheduled_date).format('ddd, DD MMM YYYY ')+ Moment(this.state.scheduled_time).format('hh:mm:ss Z')
        console.log(this.state.scheduled_date)
        const data = {
            "destination": target_location,
            "scheduled_time": this.state.scheduled_date,
            "max_orders":this.state.max_orders,
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
                    console.log(response.text)
                    this.props.navigation.dismiss()
                }
                else{
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
            {enableHighAccuracy:true, maximumAge: 2000, timeout:20000}
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

    async getYelpData (destination){
        this.setState({destination:destination.location})
        const apiURL = `https://api.yelp.com/v3/businesses/search?term=${destination.location}&latitude=${this.state.latitude}&longitude=${this.state.longitude}`
        
        try{
            const results = await fetch(apiURL,
                {
                method: 'GET',
                headers:{
                    "Authorization": "Bearer PJ8kaMDHjv-m5q4ehoklRT5xjrpEgOpqLsyysAONWOvh_AqiUPhYnOay2ERbFxXhm1_O5paPPWSLHm3pNDCENHP-seNNXd2c_3SvwRJXU-dtimCddRymhLLBqiGmXnYx"
                }
            });
            const json = await results.json()
            console.log(json)
            this.setState({business:json.businesses})
        }
        catch (err){
            this.setState({errorMessage:error.message})
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
                            onChangeText={ max_orders => this.setState({max_orders})}
                            value={this.state.max_orders}
                            keyboardType='numeric'
                            ></TextInput>
                        </View>   
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
                                <View style={{display:"row", flexDirection: "row", justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={styles.button1} onPress={showTimePicker}>
                                        <Text style={styles.buttonText1}>
                                        {Moment(this.state.scheduled_time).format('hh:mm')}
                                        </Text>   
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button1} onPress={showDatePicker}>
                                        <Text style={styles.buttonText1}>
                                            {Moment(this.state.scheduled_date).format('DD MMM, YYYY')} 
                                        </Text>   
                                    </TouchableOpacity>

                                </View>
                  
                        </View>   
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.handlePost.bind(this)}>
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