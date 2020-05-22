import React from "react"
import styled from "styled-components"
import { 
    ScrollView, 
    View, 
    Text, 
    StatusBar,
    TouchableOpacity,
    NavigationContainer 
} from "react-native";
import { 
    Ionicons, 
    FontAwesome5, 
    Entypo 
} from '@expo/vector-icons';
import { Linking } from 'expo';
import Avatar from "../components/Avatar";
import Moment from 'moment';

import firebase from '@firebase/app';
require('firebase/auth');


class RunScreen extends React.Component {
    
    static navigationOptions = {
        headerShown:false
    }
    state={
        requests:[],
        response: []
    }
    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
        this.handleRequests()
    }
      
    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true);
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


    async handleRequests(){
        const run = this.props.navigation.getParam("run");
        const user_id = firebase.auth().currentUser.uid
        if(run.user.id == user_id){
            const apiURL = `http://afternoon-brook-22773.herokuapp.com/api/pickup/${run.id}/orders`
            try {
                let response = await fetch( apiURL)
                const json = await response.json()
                this.setState({ requests: json })
            }
            catch (error) {
                this.setState({ errorMessage: error.message })
            } 
        }
        else{
            const apiURL = `http://afternoon-brook-22773.herokuapp.com/api/pickup/${run.id}/orders?user_id=${user_id}`
            try {
                let response = await fetch( apiURL)
                const json = await response.json()
                this.setState({ response : json })
            }
            catch (error) {
                this.setState({ errorMessage: error.message })
            } 
        }
    }
    render(){
        const { navigation } = this.props;
        const run = navigation.getParam("run");
        const prefix = Linking.makeUrl('/');
        const linking = {
            prefixes: [prefix],
        };
        return (
            // <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Container linking={linking}>
                <ScrollView>
                    <StatusBar hidden />
                    <Cover>
                        {run.destination.photos != null &&
                         <Image 
                         source={{uri:`https://maps.googleapis.com/maps/api/place/photo?photoreference=${run.destination.photos[1].photo_reference}&sensor=false&maxheight=1600&maxwidth=1600&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`}}/>
                         
                        }
                        <View style={{ flex: 1, position: 'absolute',bottom: 0, left: 0, right: 0,backgroundColor:"rgba(0,0,0,0.3)", height: "100%",  width: "100%"}}> 
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}></View>
                        </View>
                        <Title>{run.destination.name}</Title>
                        <Caption>{Moment(run.scheduled_time).format("h:mm a, MMMM Do YYYY")}</Caption>
                    </Cover>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.dismiss();
                    }}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20
                    }}>
                        <CloseView>
                            <Ionicons 
                                name="ios-close"
                                size={36}
                                style={{ marginTop: -2 }}
                                color="#4775f2"/>
                        </CloseView>
                    </TouchableOpacity>
                    <Wrapper>
                        <Subtitle>BY {run.user.fullName}</Subtitle>
                    </Wrapper>
                    <Content>
                          <TouchableOpacity>
                            <AvatarContainer>
                                <Avatar />
                                <AvatarTextContainer>
                                    <AvatarText>{run.user.fullName}</AvatarText>
                                    <AvatarSubtitleText>Rating 4.8 - Cartz Verifed</AvatarSubtitleText>
                                </AvatarTextContainer>
                            </AvatarContainer>
                          </TouchableOpacity>
                          <ContentTitle>{run.destination.name}</ContentTitle>
                          <ContentSubTitle>{run.destination.formatted_address}</ContentSubTitle>
                            <Types>{run.destination.types.join(" - ").replace(/_/g, " ").toUpperCase()}</Types>
                            <ContactContainer>
                                <TouchableOpacity
                                onPress={()=>{Linking.openURL(`${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${run.destination.formatted_phone_number}`)}}
                                >
                                    <ContactItem>
                                        <Ionicons 
                                        name="ios-call" 
                                        size={35} 
                                        color="#503D9E"
                                        style={{ width: "100%", height: 40,textAlign:"center"}} />
                                        <ContactTitle>Call</ContactTitle>
                                    </ContactItem>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>{Linking.openURL(`${Platform.OS === 'ios' ? 'maps:' : 'geo:'}${run.destination.geometry.location.lat},${run.destination.geometry.location.long}?q=${run.destination.name}`)}}
                                >
                                    <ContactItem>
                                        <FontAwesome5 
                                        name="map-pin" 
                                        size={29} 
                                        color="#503D9E"
                                        style={{ width: "100%", height: 40,textAlign:"center"}} />
                                        <ContactTitle>View Map</ContactTitle>
                                    </ContactItem>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <ContactItem>
                                        <Entypo 
                                        name="share" 
                                        size={32} 
                                        color="#503D9E"
                                        style={{ width: "100%", height: 40,textAlign:"center"}} />
                                        <ContactTitle>Share</ContactTitle>
                                    </ContactItem>
                                </TouchableOpacity>
                            </ContactContainer>
                            {run.user_id != firebase.auth().currentUser.uid &&
                            <View>
                                {run.destination.opening_hours != null &&
                                <View>
                                    <Text style={{fontWeight:"bold"}}>Opening Hours</Text>
                                    <OpenTimingsView>
                                        {run.destination.opening_hours.weekday_text.map((timing, index) => (
                                            <OpeningText key={index}>{timing}</OpeningText>
                                        ))}
                                    </OpenTimingsView>
                                </View>
                                }
                                 {this.state.response.length == 0 &&
                                    <TouchableOpacity
                                    onPress={()=>{this.props.navigation.navigate("RequestScreen", {
                                        run: run
                                    })}}>
                                        <RequestButton>
                                            <RequestButtonText>Request an item</RequestButtonText>
                                        </RequestButton>
                                    </TouchableOpacity>
                                 }   
                                 {this.state.response.length > 0 &&
                                    <TouchableOpacity
                                    onPress={()=>{this.props.navigation.navigate("OrderDetailScreen", {
                                        order: this.state.response[0],
                                        run: run
                                    })}}>
                                        <RequestButton>
                                            <RequestButtonText>See Your Request</RequestButtonText>
                                        </RequestButton>
                                    </TouchableOpacity>
                                 }                                 
                            </View>
                            }
                        {run.user_id == firebase.auth().currentUser.uid &&
                        <View>
                            {this.state.requests.map((order, index) => (
                            <OrderContainer key={index}>
                            <TouchableOpacity>
                                <OrderTitle>{order.user.fullName}</OrderTitle>
                                <OrderAddress>{order.user.house_address}</OrderAddress>
                                <OrderItemContainer>
                                    {order.requests[0].items.map((item, j) => <OrderItem key={j}>{item.quantity || 1} x {item.name}</OrderItem>)}
                                </OrderItemContainer>
                                {order.description != null &&
                                <OrderDescriptionContainer>
                                    <OrderDescriptionItem>{order.description}</OrderDescriptionItem>
                                </OrderDescriptionContainer>
                                }

                            </TouchableOpacity>
                            <View>
                            <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate("OrderDetailScreen", {order: order, run: run})
                            }}>
                                <OrderButtonContainer>
                                    <OrderButtonTitle>See Details</OrderButtonTitle>
                                </OrderButtonContainer>
                            </TouchableOpacity>
                            </View>
                        </OrderContainer>
                          ))} 
                            <TouchableOpacity>
                                <RequestButton style={{backgroundColor:"gray", marginTop: 10}}>
                                    <RequestButtonText>Edit Run</RequestButtonText>
                                </RequestButton>
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.dismiss()
                            }}>
                                <RequestButton style={{backgroundColor:"red", marginTop: 10}}>
                                    <RequestButtonText>Close Run</RequestButtonText>
                                </RequestButton>
                            </TouchableOpacity>
                        </View>
                    }                        
                    </Content>
                </ScrollView>

            </Container>

        )
    }
}
export default RunScreen


const Container = styled.View`
    flex: 1;
`;

const Cover = styled.View`
    height: 305px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
`;

const Image = styled.Image`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: #3c4560;
`;

const Title = styled.Text`
    font-size: 30px;
    color: white;
    font-weight: bold;
    position: absolute;
    top: 78px;
    left: 20px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};
    margin-right: 30px;
`;

const Caption = styled.Text`
    color: white;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    max-width: 300px;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};

`;

const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 22px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    top: 40px;
    left: 20px;
    align-items: center;
`;


const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 0px;
    text-transform: uppercase;
    font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};


`;
const Content = styled.View `
    height: 100%;
    background: white;
    padding: 32px;
`;
// border-radius: 40px;
// top:-25;

const OrderContainer = styled.View `
    background: white;
    borderRadius: 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    margin-bottom: 32px;
`;
const OrderTitle = styled.Text `
    color: black;
    font-weight: 600;
    font-size: 25px;
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
const OrderButtonContainer = styled.View `
    background: #503D9E;
    borderRadius: 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    padding-right: 32px;
    padding-left: 32px;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
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



const AllRequests = [
    {
        request_id:"",
        request_status: "Pending",
        requestor_name: "Someone",
        requestor_id:"",
        requestor_address: "217 Barley Ct, Roseville, CA 95747",
        distance_from_home: "0.5 mil",
        items: [
            "5 Eggs",
            "1 Bread",
            "2 Milk"
        ],
        description:"Hey! Can you bring me these items? I need them by tonight. I appreciate your help! :)"
    }
]