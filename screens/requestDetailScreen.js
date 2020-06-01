import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from "react-native"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import { TextInput } from "react-native-gesture-handler";
import Moment from 'moment';

require('firebase/auth');
const domain = "https://afternoon-brook-22773.herokuapp.com"

// const domain = "http://127.0.0.1:5000"

export default class RequestDetailScreen extends React.Component{

    state = { 
        location: [],
        errorMessage: null,
        request: this.props.navigation.getParam("request"),
        total: null     
    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {
    }

    async submitRequest(){
        const user_id = firebase.auth().currentUser.uid;
        const request = this.state.request
        const apiURL = domain + `/api/order/${request["order_id"]}/request`
        if (this.state.total == null){
            this.setState({error: "Please set a total price"})
            return
        }
        const data = {
            items: this.state.request.items,
            user_id: user_id,
            total: Number(this.state.total)
        }
        console.log(data["items"])
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
                    this.props.navigation.goBack()
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
        const request = this.state.request
        const run = this.props.navigation.getParam("run")
        const action = this.props.navigation.getParam("action")
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
                        <Text style={styles.topBarText}>Requested Items</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
                        <Text style={styles.greeting}>{`Requested Items`}</Text>

                    
                        {this.state.errorMessage != null &&(
                            <View style={styles.errorMessage}>
                                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                            </View>
                        )}

                        <View style={styles.form}>
                            <View>
                                {this.state.request.items.map((item, index) => (
                                        <View key={index} style={{ borderBottomColor: '#C0C0C0',borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, paddingBottom: 15}}>
                                            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                                            <Text multiline={true} style={styles.input}>{item.name}</Text>
                                            <Text style={styles.price}>
                                                ${item.estimated_price} x {item.quantity}
                                            </Text>
                                        </View>
                                        <Text style={styles.inputDesc}>
                                                    {item.description}
                                        </Text>
                                            {item.barcodeID != null &&(
                                                <Text 
                                                style={{height:20}}>
                                                    Barcode ID: {item.barcodeID}
                                                </Text>
                                            )}
                                            {action == "edit_order" && 
                                            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                                                <TouchableOpacity 
                                                style={[styles.editButton,{
                                                    backgroundColor: `${item.available != true ? "blue" : "white"}`,
                                                }]}
                                                onPress={()=>{
                                                    let requestedItems = Object.assign({}, this.state.request);
                                                    requestedItems.items[index].available = !requestedItems.items[index].available
                                                    this.setState({request:requestedItems});
                                                    console.log(requestedItems.items[index].available)
                                                }}>
                                                    <Text 
                                                    style={[styles.editButtonText, 
                                                    {
                                                        color: `${item.available != true ? "white" : "blue"}`
                                                    }]}>
                                                        {item.available != true ? "Not available" : "Available"}
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                            }
                                        </View>
                                        
                                ))}
                                </View>
                                {action == "view_order" && 
                                   <View>
                                        <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'flex-start', marginBottom: 20, marginTop: 20}}>
                                            <View>
                                                <Text style={styles.totalTitle}>Estimated Total Price:</Text>
                                                <Text style={[styles.serviceFeeText,]}>these are only estimates</Text>
                                            </View>
                                            <Text style={styles.totalPriceTitle}>${Number(request.total).toFixed(2)}</Text>
                                        </View>

                                        {/* <Text style={[styles.serviceFeeText, {fontStyle: "italic"}]}>The items add up to ${request.total} after taxes. Click accept to let them know that they can buy the items!</Text> */}
                                        {/* <TouchableOpacity 
                                        style={[styles.button, {marginBottom: 10, marginTop: 10}]}
                                        onPress={() => {
                                            // this.submitRequest()
                                        }}>
                                            <Text style={styles.buttonText}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                        style={styles.button}
                                        onPress={() => {
                                            // this.submitRequest()
                                        }}>
                                            <Text style={styles.buttonText}>Decline</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                }
                                {action == "edit_order" && 
                                <View style={{marginBottom: 10}}>
                                   <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'flex-start', marginBottom: 5, marginTop: 20}}>
                                       <View>
                                       <Text style={styles.totalTitle}>Total:</Text>
                                       <Text style={styles.serviceFeeText}>including taxes and other costs</Text>
                                       </View>
                                       <TextInput 
                                       style={styles.totalPriceTitle}
                                       placeholder={Number(request.items.reduce(function(prev, cur) {return Number(prev) + (Number(cur.estimated_price)*Number(cur.quantity));}, 0)*1.0).toFixed(2)}
                                       onChangeText={ total => this.setState({total: total})}
                                       value={this.state.total}
                                       keyboardType={"numeric"}
                                       />
                                   </View>
                                   <Text style={[styles.serviceFeeText, {fontStyle: "italic"}]}>The total amount is amount that you will get reimbursed once you complete the order. Make sure it corresponds with your receipt.</Text>
                                   <View>
                                   <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => {
                                        this.submitRequest()
                                    }}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                    </View>

                                </View>
                               }
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
        marginBottom: 10,
        maxWidth: 250
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
        fontSize: 14,
        marginRight:20
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
    },
    editButton:{
        padding: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 6
    },
    editButtonText:{
        color: "blue",

    }
})
