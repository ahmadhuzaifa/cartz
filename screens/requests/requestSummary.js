import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from "react-native"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import { TextInput } from "react-native-gesture-handler";
import Moment from 'moment';

require('firebase/auth');

export default class RequestSummary extends React.Component{

    state = { 
        location: [],
        errorMessage: null,
        items: [],
        itemsCount: 2,
        user: {},
        note: ""
    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {
        this.getAddress()

    }

    async getAddress(){
        const uid = firebase.auth().currentUser.uid
        const apiURL = `https://afternoon-brook-22773.herokuapp.com/api/users/${uid}`;
        const results = await fetch(apiURL)
        const json = await results.json()
        this.setState({user: json})
    }
    async addRequest(){
        const user = firebase.auth().currentUser;
        const user_id = user.uid
        const run = this.props.navigation.getParam("run");
        const items = this.props.navigation.getParam("data");
        const apiURL = `http://afternoon-brook-22773.herokuapp.com/api/pickup/${run.id}/order`

        console.log(run.id)
        const data = {
            items: items,
            user_id: user_id,
            note: this.state.note
        }
        try {
            let response = await fetch( apiURL,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
            })
                const status = response.status
                const json = await response.json()
                if(status == 200 ||status == 201){
                    this.props.navigation.dismiss()
                }
                else{
                    this.setState({ errorMessage: json.message})
                }
            }
            catch (error) {
                this.setState({ errorMessage: error.message })
            } 
    }

    render(){
        const run = this.props.navigation.getParam("run");
        const items = this.props.navigation.getParam("data");

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
                        <Text style={styles.topBarText}>Request Summary</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
                        <Text style={styles.greeting}>{`Your 😎\nOrder`}</Text>

                        <View style={styles.addressContainer}>
                            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                                <Text style={styles.addressText}>{this.state.user.house_address}</Text>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate("AddAddress")
                                }}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                                <Text style={styles.timingText}>{Moment(run.scheduled_time).format(`h:mma, Do MMM, YYYY`)}</Text>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate("AddAddress")
                                }}>
                                    {/* <Text style={styles.editText}>Edit</Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.errorMessage != null &&(

                            <View style={styles.errorMessage}>
                                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                            </View>
                        )}

                        <View style={styles.form}>
                            <View>
                                {items.map((item, index) => (
                                        <View key={index} style={{ borderBottomColor: '#C0C0C0',borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, paddingBottom: 15}}>
                                            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                                            <Text style={styles.input}>{item.itemName}</Text>
                                            <Text style={styles.price}>
                                                ${item.price} x {item.quantity}
                                            </Text>
                                        </View>
                                        <Text style={styles.inputDesc}>
                                                    {item.description}
                                        </Text>
                                            {item.barcodeID.length != 0 &&(
                                                <Text 
                                                style={{height:20}}>
                                                    Barcode ID: {item.barcodeID}
                                                </Text>
                                            )}
                                        </View>
                                ))}
                                </View>
            
                                <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'flex-start', marginBottom: 20, marginTop: 20}}>
                                    <View>
                                        <Text style={styles.totalTitle}>Total:</Text>
                                        <Text style={styles.serviceFeeText}>10% service fee</Text>
                                    </View>
                                    <Text style={styles.totalPriceTitle}>${Number(items.reduce(function(prev, cur) {return Number(prev) + (Number(cur.price)*Number(cur.quantity));}, 0)*1.1).toFixed(2)}</Text>
                                </View>
                                <TextInput 
                                style={styles.note} 
                                onChangeText={ note => this.setState({note: note})}
                                value={this.state.note}
                                placeholder="Add a note.."
                                multiline
                                ></TextInput>
                            </View>
                                
                            <View>
                            <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                this.addRequest()
                            }}>
                                <Text style={styles.buttonText}>Submit</Text>
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
        zIndex:1, 
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
        marginHorizontal: 30,
        marginTop: 20,
        flexDirection:'column',
        justifyContent:'space-between',
    },
    inputTitle:{
        color: "black",
        fontWeight: "600",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15,
        marginBottom: 20
    },
    input:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 17,
        fontWeight: "600",
        color: "black",
        height: 30,
    },
    note:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15,
        fontWeight: "300",
        color: "black",
        marginBottom: 20
    },
    inputDesc:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 14,
        fontWeight: "500",
        color: "black",
        width: "100%",
        marginTop: 0,
        color: "gray",
        maxHeight: 100,

    },
    totalTitle:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 20,
        fontWeight: "500",
        color: "black",
    },
    serviceFeeText:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 12,
        fontWeight: "500",
        color: "gray",
    },
    totalPriceTitle:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 25,
        fontWeight: "600",
        color: "black",
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
    AddButton:{
        backgroundColor: "#503D9E",
        height: 52,
        width: 52,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        alignSelf: 'flex-end',
        right: 30
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
    buttonText:{
        color: "white",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "500",
        fontSize: 15
    },
    image:{
        height:32,
        width:27,
        position:'absolute'
    },
    cardContainer:{
        borderRadius: 30,
        height: 120,
        width:150,
        backgroundColor: "black"
    },
    image:{
        height:"100%",
        width:"100%",
        position:'absolute'
    },
    imageContainer:{
        borderRadius: 10,
        height: 70,
        width:90,
        marginRight: 10,
        backgroundColor: "white",
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    greeting:{
        fontSize: 25,
        marginTop: 20,
        fontWeight: "600",
        textAlign: "left",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        marginLeft:32
    },addressContainer:{
        padding:25,
        marginHorizontal: 30,
        borderRadius: 15,
        height:120,
        backgroundColor: "#503e9d",
        marginBottom: 10,
        marginTop: 10,
        flexDirection:'column',
        justifyContent:'space-between',
    },
    addressText:{
        color: "white",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "500",
        fontSize: 14
    },
    timingText:{
        color: "white",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "600",
        fontSize: 14
    },
    editText:{
        color: "#FCD410",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "600",
        fontSize: 14,
    },
    price:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontWeight: "600",
    }
})
