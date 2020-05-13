import React from "react"
import styled from "styled-components"
import { Button, ScrollView, View, ImageBackground, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";

import firebase from '@firebase/app';
import Avatar from "../components/Avatar";
require('firebase/auth');

class OrderScreen extends React.Component {
    static navigationOptions = {
        headerShown:false
    }
    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
    }
      
    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true);
    }
    get_date_diff(date){
        const current_date = new Date()
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
    
    render(){
        const { navigation } = this.props;
        const run = navigation.getParam("run");
        return (
            <Container>
                <ScrollView>
                    <StatusBar hidden />
                    <Cover>
                        <Image 
                        source={{uri:`https://maps.googleapis.com/maps/api/place/photo?photoreference=${run.destination.photos[1].photo_reference}&sensor=false&maxheight=1600&maxwidth=1600&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`}}/>
                        
                        <View style={{ flex: 1, position: 'absolute',bottom: 0, left: 0, right: 0,backgroundColor:"rgba(0,0,0,0.2)", height: "100%",  width: "100%"}}> 
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}></View>
                        </View>
                        <Title>{run.destination.name}</Title>
                        <Caption>{run.scheduled_time}</Caption>
                    </Cover>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack();
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
                            <AvatarContainer style={{}}>
                                <Avatar></Avatar>
                                <Text>Huzaifa</Text>
                            </AvatarContainer>
                          </TouchableOpacity>




                        {/* DONT DELETE THISSSS !!!!!!*/}
                        {/* {AllRequests.map(({requestor_name, requestor_address,description, items}, index) => (
                            <OrderContainer key={index}>
                            <TouchableOpacity>
                                <OrderTitle>{requestor_name}</OrderTitle>
                                <OrderAddress>{requestor_address}</OrderAddress>
                                <OrderItemContainer>
                                    {items.map((item, j) => <OrderItem key={j}>{item}</OrderItem>)}
                                </OrderItemContainer>
                                <OrderDescriptionContainer>
                                    <OrderDescriptionItem>{description}</OrderDescriptionItem>
                                </OrderDescriptionContainer>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <OrderButtonContainer>
                                    <OrderButtonTitle>Accept</OrderButtonTitle>
                                </OrderButtonContainer>
                            </TouchableOpacity>
                        </OrderContainer>
                          ))}  */}
                    </Content>
                </ScrollView>

            </Container>

        )
    }
}
export default OrderScreen


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
    font-size: 24px;
    color: white;
    font-weight: bold;
    width: 170px;
    position: absolute;
    top: 78px;
    left: 20px;
`;

const Caption = styled.Text`
    color: white;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    max-width: 300px;
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

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`;

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-left: 0px;
    text-transform: uppercase;
`;
const Content = styled.View `
    height: 100%;
    background: white;
    padding: 32px;
`;
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
    font-family: "Avenir Next";
`;
const OrderAddress = styled.Text `
    color: #7a7a7a;
    font-weight: 500;
    font-size: 15px;
    padding-right: 20px;
    padding-left: 20px;
    font-family: "Avenir Next";
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
    font-family: "Avenir Next";
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
    font-family: "Courier New";
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
    height: 305px;
    flex-direction: row;
`;

const AllRequests = [
    {
        request_id:"",
        request_status: "Pending",
        requestor_name: "Huzaifa Ahmad",
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