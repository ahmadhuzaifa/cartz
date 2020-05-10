import React from "react"
import styled from "styled-components"
import { Button, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

 
class OrderScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
    }
      
    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content", true);
    }
    
    render(){
        const { navigation } = this.props;
        const order = navigation.getParam("run");
        return (
            <Container>
                <ScrollView>
                    <StatusBar hidden />
                    <Cover>
                        <Image source={order.image} />
                        <Title>{order.name}</Title>
                        <Caption>{order.name}</Caption>
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
                        <Logo source={order.deliverer_image} />
                        <Subtitle>{order.deliverer}</Subtitle>
                    </Wrapper>
                    <Content>


                        {AllRequests.map((request, index) => (
                            <OrderContainer key={index}>
                            <TouchableOpacity>
                                <OrderTitle>{request.requestor_name}</OrderTitle>
                                <OrderAddress>{request.requestor_address}</OrderAddress>
                                <OrderItemContainer>
                                        <OrderItem>Hello</OrderItem>
                                </OrderItemContainer>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <OrderButtonContainer>
                                    <OrderButtonTitle>Accept</OrderButtonTitle>
                                </OrderButtonContainer>
                            </TouchableOpacity>

                        </OrderContainer>
                          ))}  



                        <OrderContainer>
                            <TouchableOpacity>
                                <OrderTitle>Edison Li</OrderTitle>
                                <OrderAddress>217 Bantry Ct, Sacramento, CA</OrderAddress>
                                <OrderItemContainer>
                                    <OrderItem>5x Eggs</OrderItem>
                                    <OrderItem>1x Bread</OrderItem>
                                    <OrderItem>2x Milk</OrderItem>
                                </OrderItemContainer>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <OrderButtonContainer>
                                    <OrderButtonTitle>Accept</OrderButtonTitle>
                                </OrderButtonContainer>
                            </TouchableOpacity>

                        </OrderContainer>

                        <OrderContainer>
                            <OrderTitle>Huzaifa Ahmad</OrderTitle>
                            <OrderAddress>217 Bantry Ct, Sacramento, CA</OrderAddress>
                            <OrderButtonContainer style={{backgroundColor: 'green'}}>
                                <OrderButtonTitle style={{color: 'white'}}>On My Way</OrderButtonTitle>
                            </OrderButtonContainer>
                        </OrderContainer>

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
    font-size: 17;
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
    margin-left: 5px;
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
    color: #C0C0C0;
    font-weight: 500;
    font-size: 15px;
    padding-right: 20px;
    padding-left: 20px;
    font-family: "Avenir Next";
`;

const OrderItemContainer = styled.View`
    padding-top: 20px;
`;
const OrderItem = styled.Text `
    color: gray;
    font-weight: 500;
    font-size: 15px;
    font-family: "Avenir Next";
    padding-bottom: 5px;
    padding-right: 32px;
    padding-left: 32px;
`;

const OrderDescriptionItem = styled.Text `
    color: #C0C0C0;
    font-weight: 500;
    font-size: 12px;
    font-family: "Avenir Next";
    padding-bottom: 5px;
    padding-right: 32px;
    padding-left: 32px;
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




const AllRequests = [
    {
        request_id:"",
        request_status: "Pending",
        requestor_name: "Huzaifa Ahmad",
        requestor_id:"",
        requestor_address: "217 Barley Ct, Roseville, CA 95747",
        distance_from_home: "0.5 mil",
        items: {
            Eggs: 5,
            Bread:1,
            Milk:2
        }

    }
]