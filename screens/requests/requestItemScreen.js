import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export default class RequestItemScreen extends React.Component{

    state = { 
        location: [],
        errorMessage: null,
        images:[],
        barcodeData: "",
        description:"",
        itemName: "",
        price: null,
        quantity: null

    }

    static navigationOptions = {
        headerShown:false
    }

    componentDidMount() {
      this.getPermissionAsync()

    }
    setBarcodeData(data, type) {
        this.setState({barcodeData: data, barcodeType: type});
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const stat_roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const stat_camera = await Permissions.askAsync(Permissions.CAMERA);
            if (stat_roll.status != 'granted' || stat_camera.status != 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
    }};
    
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {

            this.setState(state => {
                const list = state.images.push(String(result.uri));
                return {
                    list
                };
            });
        }
        console.log(result);
    } catch (E) {
        console.log(E);
    }};


    handleAddItem(){
        if (this.state.itemName.length == 0 || this.state.description.length == 0){
            this.setState({errorMessage: "Please add an item name and a description"})
        }
        else if (this.state.price == null){
            this.setState({errorMessage: "Please add an estimated price"})
        }
        else{
            var data = {
                itemName: this.state.itemName,
                description: this.state.description,
                barcodeID: this.state.barcodeData,
                images: this.state.images,
                price: this.state.price,
                quantity: this.state.quantity
            };
    
            this.props.navigation.state.params.addRequestItemData(data);
            this.props.navigation.goBack()
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
                    <Text style={styles.topBarText}>Add Item</Text>
                    </View>

                    <ScrollView keyboardDismissMode={true}>
       

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        
                            <View>
                                {/* <Text style={styles.inputTitle}>Item name</Text> */}
                                <View>

                                    <View style={{display:"row", flexDirection: "row", alignItems: "center"}} >
                                        <TextInput 
                                        style={styles.input} 
                                        onChangeText={ itemName => this.setState({itemName: itemName})}
                                        value={this.state.itemName}
                                        placeholder="Item Name"
                                        ></TextInput>
                                    </View>
                                    <TextInput 
                                    multiline
                                    style={styles.inputDesc} 
                                    onChangeText={ description => this.setState({description: description})}
                                    value={this.state.description}
                                    placeholder="Add a note for the deliverer..."
                                    ></TextInput>
                                    {/* <Text style={styles.inputTitle}>If possible provide the barcode ID</Text> */}

                                    <View style={{display:"row", flexDirection: "row", alignItems: "center"}}>

                                        <TextInput 
                                        multiline
                                        style={styles.inputBarcode} 
                                        onChangeText={ data => this.setState({barcodeData: data})}
                                        value={this.state.barcodeData}
                                        placeholder="Barcode ID (Optional)"
                                        autoCapitalize={"characters"}
                                        ></TextInput>
                                        <TouchableOpacity
                                        onPress={()=>{
                                            this.props.navigation.navigate("BarcodeScanner", {setBarcodeData: this.setBarcodeData.bind(this)})
                                        }}>
                                            <Ionicons 
                                            name="ios-barcode" 
                                            size={32} 
                                            color="black"/>
                                        </TouchableOpacity>
                                    </View>
          
                                </View>
                                <Text style={styles.inputTitle}>Attach Images</Text>

                                <ScrollView
                                horizontal={true} 
                                style={{paddingTop: 15, paddingBottom: 15}}
                                >
                                {this.state.images.map((image, index) => (

                                        <TouchableOpacity
                                        onPress={()=>{
                                        }}
                                        key={index}
                                        >
                                            <View style={styles.imageContainer}>
                                                <Image source={{ uri: image }} style={styles.image}/>
                                            </View>
                                    </TouchableOpacity>
                                    ))}

                                    <TouchableOpacity
                                    onPress={()=>{
                                        this._pickImage()
                                    }}
                                    >
                                        
                                        <View style={styles.imageContainer}>
                                            <Image source={require("../../assets/placeholder-add.jpg")} style={styles.image}/>
                                            {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}

                                        </View>
                                    </TouchableOpacity>

                                </ScrollView>
                                <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center', marginBottom: 5}}>
                                    <Text style={styles.numericalInputText}>Quantity:</Text>
                                    <TextInput 
                                        style={styles.numericalInput} 
                                        onChangeText={ quantity => this.setState({quantity: quantity})}
                                        value={this.state.quantity}
                                        placeholder="3"
                                    ></TextInput>
                                </View>
                                <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center', marginBottom: 10}}>
                                    <Text style={styles.numericalInputText}>Estimated Price ($):</Text>
                                    <TextInput 
                                        style={styles.numericalInput} 
                                        onChangeText={ price => this.setState({price: price})}
                                        value={this.state.price}
                                        placeholder="10"
                                    ></TextInput>
                                </View>
                                {/* <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center', marginBottom: 10}}>
                                    <Text style={styles.numericalInputText}>Estimated Price ($):</Text>
                                    <TextInput 
                                        style={styles.numericalInput} 
                                        onChangeText={ itemName => this.setState({itemName: itemName})}
                                        value={this.state.itemName}
                                        placeholder="10"
                                    ></TextInput>
                                </View>*/}
                                
                                
                             </View>  

                        </View>
    
                    <View>
      
                        <TouchableOpacity style={styles.button}
                        onPress={()=>this.handleAddItem()}>
                            <Text style={styles.buttonText}>Add</Text>
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
    },
    input:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 25,
        fontWeight: "600",
        color: "black",
        height: 40,
        width: "100%",
    },
    inputDesc:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 17,
        fontWeight: "500",
        color: "black",
        width: "100%",
        marginTop: 0,
        paddingTop: 15,
        paddingBottom: 15
    },
    inputBarcode:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 17,
        fontWeight: "500",
        color: "black",
        height: 50,
        width: "90%",
        marginTop: 0
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
        height:"100%",
        width:"100%",
        position:'absolute'
    },
    imageContainer:{
        borderRadius: 30,
        height: 120,
        width:150,
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
    numericalInput:{
        fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
        fontSize: 30,
        fontWeight: "600",
        color: "black",
        height: 40,
    },numericalInputText:{
        fontSize: 17,
        fontWeight: '500'
    }
})
