import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, StatusBar } from "react-native"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class RequestScreen extends React.Component{

    state = { 
        location: [],
        errorMessage: null,
        items: [],
        itemsCount: 2
    }
    componentDidMount(){
        const run = this.props.navigation.getParam("run")
        this.setState({run: run})
    }

    static navigationOptions = {
        headerShown:false
    }

    changeInText(key,text){
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
    addRequestItemData(data) {
        this.setState({items: this.state.items.concat([data])});
        console.log(this.state.items)
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
                                <Text style={styles.inputTitle}>What items do you need?</Text>
                                <View>
                                    {this.state.items.length == 0 && (
                                        <Text style={styles.addErrText}>No items added. Please add an item using the "+" sign</Text>
                                    )}
                                    {this.state.items.map((item, index) => (
                                    <View key={index} style={{ borderBottomColor: '#C0C0C0',borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: 10, paddingBottom: 15}}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Text style={styles.input} >{item.itemName}</Text>
                                            <TouchableOpacity>
                                                <Ionicons 
                                                name="ios-close"
                                                size={36}
                                                style={{ marginTop: -5, marginLeft: 0  }}
                                                color="#503D9E"/>
                                            </TouchableOpacity>    
                                        </View>
                                        <Text style={styles.inputDesc}>
                                        {item.description}
                                            {/* Can you get me a dozen eggs. Make sure its "" brand. Again I really appreciate you :) */}
                                        </Text>
                                        {item.barcodeID.length != 0 &&(
                                            <Text 
                                            style={{height:20}}>

                                                Barcode ID: {item.barcodeID}

                                                {/* IJONDSAHXSSASXDSA */}
                                            </Text>
                                        )}
                                        {item.images.length != 0 &&(
                                        <ScrollView
                                        horizontal={true} 
                                        style={{paddingTop: 15, paddingBottom: 15}}
                                        >
                                            {item.images.map((image, index) => (
                                            <TouchableOpacity
                                            onPress={()=>{

                                            }}
                                            key={index}>
                                                <View style={styles.imageContainer}>
                                                    <Image source={{ uri: image }} style={styles.image}/>
                                                </View>
                                            </TouchableOpacity>))}
                                        </ScrollView>
                                        )}
                                    </View>
                                    ))}
                                
                                </View> 
                            </View>   
                            <View>  
                                <TouchableOpacity 
                                style={styles.AddButton}
                                onPress={()=>{
                                    this.props.navigation.navigate("RequestItemScreen", 
                                        {addRequestItemData: this.addRequestItemData.bind(this)}
                                        )}}
                                >
                                <Ionicons 
                                name="ios-add" 
                                size={27} 
                                color="white"/>
                                </TouchableOpacity>
                            </View>
                            <View>
                            <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{
                                this.props.navigation.navigate("RequestSummary", 
                                {
                                    data: this.state.items,
                                    run: this.state.run
                                })}
                            }>
                                <Text style={styles.buttonText}>Continue</Text>
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
    },
    inputTitle:{
        color: "black",
        fontWeight: "600",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 15,
        marginBottom: 20
    },
    addErrText:{
        color: "#2D2D2D",
        fontWeight: "600",
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center"
    },
    input:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 17,
        fontWeight: "600",
        color: "black",
        height: 30,
        width:Dimensions.get('window').width - 80,
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
    }
})
