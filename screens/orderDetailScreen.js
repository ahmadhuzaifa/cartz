import React from "react"
import styled from "styled-components"
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { StatusBar , KeyboardAvoidingView, Platform, StyleSheet} from "react-native";

import firebase from '@firebase/app';
require('firebase/auth');
import { Linking } from 'expo';
import { SafeAreaView } from "react-native-safe-area-context";
import Comment from "../components/Comment";



class OrderDetailScreen extends React.Component {
    
    static navigationOptions = {
        headerShown:false
    }
    constructor(props) {
        super(props);
        this.state={
            requests:[],
            keyboardOffset: 0,
            message: "",
            conversation: []
        }


    }
    componentDidMount() {

        this.handleConversation()
    }

      
    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true);

    }


    _keyboardDidShow(event) {
        this.setState({
            keyboardOffset: event.endCoordinates.height - 10,
        })
    }

    _keyboardDidHide() {
        this.setState({
            keyboardOffset: 0,
        })
    }

    get_date_diff(date){
        const diff =  (new Date(date) - new Date())
        const minutes = diff/60000
        const hours = minutes/60
        const days = hours/24
        var date_string = ""
  
        if(minutes <= 60){
          date_string= "Leaving in " + Number(minutes.toFixed(0)) + " Minutes "
        }
        else if(hours <= 24){
          date_string= "Leaving in " + Number(hours.toFixed(0)) + " hours "
        }
        
        else{
          date_string= "Leaving in " + Number(days.toFixed(0)) + " days "
        }
        return date_string
    }


    async handleConversation(){
        // /pickup/<pickup_id>/orders
        const order = this.props.navigation.getParam("order");
        const apiURL = `http://afternoon-brook-22773.herokuapp.com/api/order/${order.id}/conversation`

        try {
            let response = await fetch(apiURL)
            const json = await response.json()
            this.setState({ conversation: json })
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
        } 
    }
    async handleSendText(){
        if (this.state.message.length > 0){
            const order = this.props.navigation.getParam("order");

            const apiURL = `http://afternoon-brook-22773.herokuapp.com/api/order/${order.id}/comment`

            const data = {
                message: this.state.message,
                user_id: firebase.auth().currentUser.uid
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
                if(status == 200 || status == 201){
                    this.handleConversation()
                }
                else{
                    this.setState({ errorMessage: json.message})
                }
            }
            catch (error) {
                this.setState({ errorMessage: error.message })
            } 
            this.setState({message:""})
        }
    }
    render(){
        const { navigation } = this.props;
        const order = navigation.getParam("order");
        const run = navigation.getParam("run");

        return (
            // <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>

            <Container>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar hidden />
                    <TopBar>
                        <Title>{order.user.fullName}'s Order</Title>
                        <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{
                            position: "absolute",
                            left: 20
                        }}>
                            <CloseView>
                                <Ionicons 
                                    name="ios-arrow-back"
                                    size={20}
                                    style={{ marginTop: 2 }}
                                    color="#4775f2"/>
                            </CloseView>
                        </TouchableOpacity>
                    </TopBar>
                    <ScrollView keyboardDismissMode={true}>

                    <Content>
                        <View>

                        {this.state.conversation.map((response, index)=> (
                            <View key={index}>
                            {response.type == "request" && 
                              <OrderContainer>
                                <TouchableOpacity>
                                    <OrderTitle>{run.destination.name}</OrderTitle>
                                    <OrderAddress>To: {order.user.house_address}</OrderAddress>
                                    <OrderItemContainer>
                                        {response.items.map((item, j) => 
                                        <View key={j}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <OrderItem>{item.quantity || 1} {item.name}</OrderItem>
                                                <OrderItemPrice>${Number(item.estimated_price).toFixed(2)}</OrderItemPrice>
                                            </View>
                                            <OrderItemDescription>{item.description || ""}</OrderItemDescription>
                                        </View>
                                        )}
                                    </OrderItemContainer>
                                    {response.description != null &&
                                    <OrderDescriptionContainer>
                                        <OrderDescriptionItem>{response.description}</OrderDescriptionItem>
                                    </OrderDescriptionContainer>
                                    }
    
                                </TouchableOpacity>
                                {firebase.auth().currentUser.uid == run.user.id &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TouchableOpacity
                                    onPress={()=>{
                                    }}>
                                        <OrderButtonContainer>
                                            <Ionicons 
                                                name="ios-close"
                                                style={{marginTop:2}}
                                                size={32}
                                                color="#FCD460"/>
                                        </OrderButtonContainer>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={()=>{
                                    }}>
                                        <OrderButtonContainer style={{width:150, backgroundColor:"green"}}>
                                                    <OrderButtonTitle>Accept</OrderButtonTitle>
                                        </OrderButtonContainer>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={()=>{
                                    }}>
                                        <OrderButtonContainer>
                                            <EvilIcons 
                                                name="pencil"
                                                size={32}
                                                color="#FCD460"/>
                                        </OrderButtonContainer>
                                    </TouchableOpacity>
                                </View>
                                
                                }
                            
                            </OrderContainer>
                                
                            }
                            {response.type == "comment" && 
                                <Comment
                                Text={response.message}
                                currentUserName={response.user.fullName}
                                currentUser={response.user.id == firebase.auth().currentUser.uid}/>
                            }
                          </View>
                         
                        ))}
                       <View>

                            {/* <Comment
                            Text={"Hey can you get me these items. Thanks"}
                            currentUserName="Huzaifa"
                            currentUser={false}/>
                            <Event>You accepted the request</Event> */}

                
                            </View>
                        </View>
                    </Content>
                </ScrollView>
                <KeyboardAvoidingView 
                style={{position: 'absolute', left: 0, right: 0, bottom: 0,}}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'stretch', backgroundColor: "white", width: '100%'}}>
                        <MessageInput
                        onChangeText={message => this.setState({ message: message })}
                        value={this.state.message}
                        placeholderTextColor='gray'
                        placeholder="Send a chat"
                        underlineColorAndroid='transparent'
                        />
                        <TouchableOpacity 
                        onPress={()=> {
                            this.handleSendText()
                        }}>
                            <ButtonText>Send</ButtonText>
                        </TouchableOpacity>
                        {/* <Button title="Send" style={{width:50, backgroundColor:"white", padding: 20}}></Button> */}

                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
           
        </Container>

        )
    }
}
export default OrderDetailScreen


const Container = styled.View`
    flex: 1;
`;

const TopBar = styled.View`
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    height: 70px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    z-index:1;
`;

const Title = styled.Text`
    font-size: 20px;
    color: #503D9E;
    font-weight: bold;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
    width:100%;
    position: absolute;
    text-align: center;
    `;


const CloseView = styled.View`
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;
const Event = styled.Text`
    font-size: 15px;
    color: gray;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
    font-weight: 500;    
    font-style: italic;
    text-align: center;
    margin-top: 10px;
`;
const Content = styled.View `
    height: 100%;
    padding: 32px;
    margin-bottom: 400px;
`;
// border-radius: 40px;
// top:-25;

const OrderContainer = styled.View `
    background: white;
    borderRadius: 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    margin-bottom: 32px;
`;
const MessageInput = styled.TextInput `
    height:60px;
    background-color: white;
    padding-right: 20px;
    padding-left: 20px;
    font-size: 15px;
    flex:1 ;
    align-content: stretch;
`;
const OrderTitle = styled.Text `
    color: black;
    font-weight: 600;
    font-size: 22px;
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
;
`;
const OrderAddress = styled.Text `
    color: #7a7a7a;
    font-weight: 500;
    font-size: 15px;
    padding-right: 20px;
    padding-left: 20px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
;
`;

const ButtonText = styled.Text `
    color: #503D9E;
    font-weight: 500;
    font-size: 15px;
    padding: 20px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
`;


const OrderDescriptionContainer = styled.View`
    padding-top: 5px;
    padding-bottom: 10px;
    padding-right: 25px;
    padding-left: 25px;
`;
const OrderDescriptionItem = styled.Text `
    color: black;
    font-weight: 500;
    font-size: 15px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
;
`;
const OrderItemContainer = styled.View`
    padding-top: 15px;
    padding-bottom: 10px;
    padding-right: 32px;
    padding-left: 32px;
`;
const OrderItem = styled.Text `
    color: #383838;
    font-weight: 400;
    font-size: 16px;
    font-family: ${Platform.select({ ios: `Courier New`, android: `Roboto` })};
    text-transform: uppercase;
`;
const OrderItemDescription = styled.Text `
    color: #383838;
    font-weight: 400;
    font-size: 15px;
    font-family: ${Platform.select({ ios: `Courier New`, android: `Roboto` })};
    padding-left: 30px;
`;

const OrderItemPrice = styled.Text `
    color: black;
    font-weight: 600;
    font-size: 16px;
    font-family: ${Platform.select({ ios: `Courier New`, android: `Roboto` })};
    text-transform: uppercase;
`;
const OrderButtonContainer = styled.View `
    background: #503D9E;
    borderRadius: 17px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    margin-top: 15px;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
`
const OrderButtonTitle = styled.Text `
    color: #FCD460;
    font-weight: 600;
    font-size: 17px;
    padding-top: 15px;
    padding-bottom: 15px;
`;

const AvatarContainer = styled.View`
    height: 45px;
    flex-direction: row;
`;
const AvatarTextContainer = styled.View`
    flex-direction: column;
    justify-content: center;
`
//width: 100%;



const AvatarText = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: black;
    padding-left: 10px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};


`;
const AvatarSubtitleText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: gray;
    padding-left: 10px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};


`;
const ContentTitle = styled.Text`
    font-size: 22px;
    color: black;
    font-weight: 700;
    width: 100%;
    padding-top: 30px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};

`;
const ContentSubTitle = styled.Text`
    font-size: 14px;
    color: gray;
    font-weight: 600;
    width: 100%;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};

`;
const Types = styled.Text`
    font-size: 12px;
    color: black;
    font-weight: 600;
    width: 100%;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};

`;

const ContactContainer = styled.View `
    flex-direction: row;
    width: 100%;
    background-color: white;
    height: 110px;
    padding-top: 5px;
    justify-content: center;
    align-items: center;
`

const ContactItem = styled.View`
    flex-direction: column;
    height: 70px;
    width: 60px;
    background-color: white;
    margin-right:10px;
    margin-left:10px;
`
const ContactImage = styled.Image`
    width: 100%;
    height: 50px;
    background-color: blue;
`
const ContactTitle = styled.Text`
    width: 100%;
    font-size: 10px;
    font-weight: 700;
    text-align:center;
`
const OpenTimingsView = styled.View`

`
const OpeningText = styled.Text`
    width: 100%;
    font-size: 13px;
    font-weight: 300;
    color: black;
    padding-top: 10px;
`
const RequestButton = styled.View`

    background: #503D9E;
    height: 50px;
    margin-top: 30px
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`
const RequestButtonText = styled.Text`
    font-size: 15px;
    color: white;
`



