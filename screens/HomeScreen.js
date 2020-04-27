import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import Card from '../components/card';
import { Ionicons } from '@expo/vector-icons';
import Action from '../components/Action';
import Cart from '../components/Cartz';
import Menu from '../components/Menu';
import { connect } from "react-redux"
import Avatar from '../components/Avatar';

import firebase from '@firebase/app';
require('firebase/auth');



function mapStateToProps(state){
    return { action: state.action }
}

function mapDispatchToProps(dispatch){
    return {
        openMenu: () => dispatch({
            type: "OPEN_MENU"
        })
    }
}

class HomeScreen extends React.Component {
    state = {
        scale: new Animated.Value(1), 
        opacity: new Animated.Value(1),
        email: "",
        displayName:""
    };
    static navigationOptions = {
      header:null
    }
    componentDidUpdate(){
        this.toggleMenu()
    }
    componentDidMount(){
      const {email, displayName} = firebase.auth().currentUser
      this.setState({email, displayName});
      StatusBar.setBarStyle("dark-content", true)
    }

    signOutUser = () => {
      firebase.auth().signOut();
    }
    toggleMenu = () => {
        if(this.props.action == "openMenu"){
            Animated.timing(this.state.scale, {
                toValue: 0.9,
                duration: 200,
                easing: Easing.in()
            }).start()
            Animated.spring(this.state.opacity, {
                toValue: 0.5
            }).start()
            StatusBar.setBarStyle("light-content", true)
        }
        if(this.props.action == "closeMenu"){
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: 300,
                easing: Easing.in()
            }).start()
            Animated.spring(this.state.opacity, {
                toValue: 1
            }).start()
            StatusBar.setBarStyle("dark-content", true)
        }
    }
    render(){
        return (
            <RootView>
                <Menu />
                <AnimatedContainer style={{ transform: [{scale: this.state.scale}],
                 opacity: this.state.opacity }}>
                <SafeAreaView>
                    <ScrollView style={{height:"100%"}}>
                    <TitleBar>
                        <TouchableOpacity onPress={this.props.openMenu}  style={{position:'absolute', top:0, left:20}}>
                            <Avatar />
                        </TouchableOpacity>
                        <Title>Welcome back!</Title>
                        <Name>Hi {this.state.displayName}!</Name>
                        <Ionicons 
                        name="ios-notifications" 
                        size={32} 
                        color="#503D9E"
                        style={{ position: "absolute", right:20, top:5}} />
                    </TitleBar>
                    <Subtitle>Shortcuts</Subtitle>
            
                    <ScrollView 
                    horizontal={true} 
                    style={{paddingBottom:20, paddingTop:15, flexDirection:"row"}} 
                    showsHorizontalScrollIndicator={false}>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddRun")}}>
                        <Action 
                        Image={require('../assets/leaving.png')}
                        Text="Leaving" />
                      </TouchableOpacity>    
                      <TouchableOpacity>
                        <Action 
                        Image={require('../assets/truck.png')}
                        Text="Deliver" />
                      </TouchableOpacity>    
                      <TouchableOpacity>
                        <Action 
                        Image={require('../assets/request.png')}
                        Text="Request" />
                      </TouchableOpacity>    
                    </ScrollView>
            
                    <Subtitle>Scheduled Runs</Subtitle>
                    <ScrollView 
                    horizontal={false} 
                    style={{paddingBottom:30}} 
                    showsHorizontalScrollIndicator={false}>
                        {ScheduledRuns.map((order, index) => (
                          <TouchableOpacity 
                          key = {index}
                          onPress={()=>{
                            this.props.navigation.navigate("Order", {
                                order: order
                            })}} >
                          <Card 
                          CartTitle= {order.cart_title}
                          Image= {order.image}
                          Progress={order.progress}
                          Caption={order.order_title}
                          Time={order.order_time} />
                          </TouchableOpacity>
                          ))}  
                    </ScrollView>
                    {/* <Subtitle>Scheduled Cartz</Subtitle>
                    {CartzNearby.map((cart, index) => (
                        <Cart 
                        key={index}
                        Image={cart.Image}
                        Market_name={cart.Market_name}
                        Time={cart.order_time}
                        Deliverer={cart.Deliverer} 
                        />
                    ))} */}
                    </ScrollView>
                    </SafeAreaView>
                </AnimatedContainer>
            </RootView>
          );
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )
    (HomeScreen)

const RootView = styled.View`
    background:black;
    flex: 1;
    font-family: "Avenir Next";

`

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

const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;  
  font-family: "Avenir Next";

`;

const Name = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: bold; 
 
`;


const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;


const ScheduledRuns = [
  {
    cart_title: "GameStop Sacramento",
    image: require('../assets/background7.jpg'),
    progress: 'done',
    order_title: "GameStop",
    order_time: "Sunday @ 2 PM",
    deliverer: "Huzaifa Ahmad",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    cart_title: "Walmart",
    image: require('../assets/walmart.jpeg'),
    progress: 'done',
    order_title: "Going to Walmart",
    order_time: "Sunday @ 2 PM",
    deliverer: "Edison Li",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    cart_title: "Asians Food Market",
    image: require('../assets/asian_food_market.jpg'),
    progress: 'alert',
    order_title: "Asian Food Market",
    order_time: "Sunday @ 2 PM",
    deliverer: "Huzaifa Ahmad",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    cart_title: "Walmart",
    image: require('../assets/background1.jpg'),
    progress: 'done',
    order_title: "Asian Food Markert",
    order_time: "Sunday @ 2 PM",
    deliverer: "Edison Li",
    deliverer_image: require('../assets/avatar.jpg')
  }
]

const CartzNearby = [
  {
    Market_name: "Walmart",
    Image: require('../assets/walmart.jpeg'),
    Deliverer: "Huzaifa",
    order_time: "Sunday @ 2 PM"
  },
  {
    Market_name: "Asian Food Market",
    Image: require('../assets/asian_food_market.jpg'),
    Deliverer: "Edison",
    order_time: "Sunday, 3 PM"
  }
]
