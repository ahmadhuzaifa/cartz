import React from "react"
import styled from "styled-components"
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { StatusBar , KeyboardAvoidingView, Platform, StyleSheet} from "react-native";
import Moment from 'moment';

import firebase from '@firebase/app';
require('firebase/auth');
import { Linking } from 'expo';
import { SafeAreaView } from "react-native-safe-area-context";
import Comment from "../components/Comment";

const domain = "https://afternoon-brook-22773.herokuapp.com"
// const domain = "http://127.0.0.1:5000"

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
            conversation: [],
            run: this.props.navigation.getParam("run"),
            order: this.props.navigation.getParam("order")
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
            keyboardOffset: event.endCoordinates.height
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
        const order = this.props.navigation.getParam("order");

        const apiURL = domain + `/api/order/${order.id}/conversation`
        console.log(apiURL)
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

            const apiURL = domain+`/api/order/${order.id}/comment`

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
    async closeOrder(){
        const order = this.props.navigation.getParam("order");
        const apiURL = domain+`/api/order/${order.id}/decline`
        try {
            let response = await fetch(apiURL)
            const status = response.status
            const json = await response.json()
            if(status == 200 || status == 201){
                this.setState({order: json})
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
    render(){
        const { navigation } = this.props
        const order = this.state.order;
        console.log(order.active)
        const run = navigation.getParam("run");
        const deliverer = run.user;
        const request_user = order.user;

        return (
            <Container>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar hidden />
                    <TopBar>
                        {firebase.auth().currentUser.uid ==  deliverer.id && 
                        <Title>{request_user.fullName}</Title>
                        }
                        {firebase.auth().currentUser.uid == request_user.id && 
                        <Title>{deliverer.fullName}</Title>
                        }
                        {/* <Title>{order.user.fullName}</Title> */}
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
                    <ScrollView 
                    keyboardDismissMode={true}
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}>

                    <Content>
                        <View>

                        {this.state.conversation.map((response, index)=> (
                            <View key={index}>
                            {response.type == "request" && 
                              <OrderContainer>
                                <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate("RequestDetailScreen", {
                                            request: response,
                                            run: run,
                                            action: "view_order"
                                        })
                                }}>
                                    <OrderSubtitle>By {response.user.fullName}</OrderSubtitle>
                                    <OrderTitle>{run.destination.name}</OrderTitle>
                                    <OrderAddress>To: {request_user.house_address.formatted_address}</OrderAddress>
                                    <OrderItemContainer>
                                        {response.items.map((item, j) => 
                                        <View key={j}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <OrderItem 
                                                style={{ 
                                                    textDecorationLine: `${item.available == false ? "line-through": "none"}`
                                                }}>{item.quantity || 1} {item.name}</OrderItem>
                                                <OrderItemPrice style={{ 
                                                    textDecorationLine: `${item.available == false ? "line-through": "none"}`
                                                }}>${Number(item.estimated_price).toFixed(2)}</OrderItemPrice>
                                            </View>
                                            <OrderItemDescription
                                                style={{
                                                    textDecorationLine: `${item.available == false ? "line-through": "none"}`
                                            }}>{item.description || ""}</OrderItemDescription>
                                        </View>
                                        )}
                                    </OrderItemContainer>
                                    {response.description != null &&
                                    <OrderDescriptionContainer>
                                        <OrderDescriptionItem>{response.description}</OrderDescriptionItem>
                                    </OrderDescriptionContainer>
                                    }    
                                </TouchableOpacity>

                                {response.request_status == 'Pending' && firebase.auth().currentUser.uid == deliverer.id &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <TouchableOpacity
                                        onPress={()=>{
                                            this.closeOrder()
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
                                                // this.props.navigation.navigate("RequestDetailScreen", {
                                                //     request: response,
                                                //     run: run
                                                // })
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
                                </View>}
                                {response.request_status == 'Rejected' &&
                                <View>
                                    <Event>
                                    {response.user.fullName} rejected this request
                                    </Event>

                                </View>
                                    }
                                    {/* {response.request_status == 'Pending' && firebase.auth().currentUser.uid == response.user_id &&
                                        <Event>
                                            Pending
                                        </Event>
                                    } */}
                            </OrderContainer>
                       
                            }
                            
                            {response.type == "comment" && 
                                <Comment
                                Text={response.message}
                                currentUserName={response.user.fullName}
                                currentUser={response.user.id == firebase.auth().currentUser.uid}
                                timeSent={Moment(response.time_created).format("h:mm a, Do MMM")}/>
                            }
                          </View>
                         
                        ))}
                       <View>
                            {/* <Event>You accepted the request</Event>  */}

                            </View>
                        </View>
                    </Content>
                </ScrollView>
                {order.active == true &&
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
                          multiline
                          returnKeyType="send"
  
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
                
                }
              
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
    margin-bottom: 10px;
`;
const OrderSubtitle = styled.Text`
    font-size: 15px;
    color: gray;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
    font-weight: 500;    
    margin-top: 10px;
    margin-horizontal: 20px;
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
    margin-top: 32px;
`;
const MessageInput = styled.TextInput `
    background-color: white;
    padding: 20px;
    font-size: 15px;
    flex:1 ;
    align-content: stretch;
    max-height: 100px;
`;
const OrderTitle = styled.Text `
    color: black;
    font-weight: 600;
    font-size: 22px;
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
    max-width:220px;

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



