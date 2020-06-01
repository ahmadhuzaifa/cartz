import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import styled from 'styled-components';
import Moment from 'moment';

import { Ionicons } from '@expo/vector-icons';
import RunCard from '../components/runCard';
import firebase from '@firebase/app';
require('firebase/auth');
const domain = "https://afternoon-brook-22773.herokuapp.com"

class OrdersScreen extends React.Component {
    state = {
      orders: [],
      refreshing: false

    }
    static navigationOptions = {
        headerShown:false
    }
    componentDidMount(){
      this.getData()
    }
    _onRefresh = () => {
      this.setState({refreshing: true});
      this.getData().then(() => {
        this.setState({refreshing: false});
      });
    }

    async getData(){
      const uid = firebase.auth().currentUser.uid
      const apiURL = domain + `/api/users/${uid}/orders`;
  
        try {
          let response = await fetch( apiURL)
          const json = await response.json()
          console.log(apiURL)
          this.setState({orders: json})
          // console.log(json)
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
            console.log(error)
        }
      // http://127.0.0.1:5000/api/users/v3lTDLUcP4YVY29e3Gu2sLrT5k02/orders
    }
    render(){
        return (
                <Container>
                    <SafeAreaView>
                    <TitleBar>
                        <Title>Your Orders</Title>
                        {/* <Ionicons 
                        name="ios-notifications" 
                        size={32} 
                        color="#503D9E"
                        style={{ position: "absolute", right:20, top:5}} /> */}
                    </TitleBar>
                    <ScrollView>

                    <Subtitle>Your Orders</Subtitle>
                    <ScrollView style={{height:"100%", paddingBottom: 200}}
                      refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                      }>
                        {this.state.orders.length  ==  0 &&
                        <Text>No recent orders</Text>
                        }
                            {this.state.orders.sort(function(a,b){
                              return new Date(b.post_time) - new Date(a.post_time);
                            }).map((order, index) => (
                            <TouchableOpacity 
                            key = {index}
                            onPress={()=>{
                                this.props.navigation.navigate("OrderDetailScreen", {
                                run: order.pickup,
                                order: order
                                })}} >
                              <RunCard 
                              CartTitle= {order.pickup.destination.name}
                              Progress={order.status}
                              Time= {`Scheduled Cart for ${Moment(order.pickup.scheduled_time).format("h:mm a, Do MMM, YYYY")}`}
                              Name={order.pickup.user.fullName}
                              />

                            </TouchableOpacity>
                            ))}  
                        </ScrollView>
                        </ScrollView>

                        </SafeAreaView>

                </Container>
        )
    }
}
export default OrdersScreen

const Subtitle = styled.Text`
  color:#C8C8C8;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
  font-family: "Avenir Next";
`

const Container = styled.View`
  flex: 1;
  background-color: white;
  overflow: hidden;

`; 
const TitleBar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 27px;
  height: 60px;
`;

const Title = styled.Text`
  font-size: 30px;
  color: black;
  font-weight: 700; 
`;



const Text = styled.Text`
  font-size: 15px;
  color: gray;
  font-weight: 500; 
  text-align: center;
  margin-top: 10px;
`;