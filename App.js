import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Card from './components/card';
import { Ionicons } from '@expo/vector-icons';
import Action from './components/Action';
import Cart from './components/Cartz';
import Menu from './components/Menu';


export default function App() {
  return (
    <Container>
      <Menu />
      <SafeAreaView>
        <ScrollView style={{height:"100%"}}>
          <TitleBar>
            <Avatar source={require('./assets/avatar.jpg')} />
            <Title>Welcome back!</Title>
            <Name>Huzaifa</Name>
            <Ionicons 
            name="ios-notifications" 
            size={32} 
            color="#4775f2"
            style={{ position: "absolute", right:20, top:5}} />
          </TitleBar>
          <Subtitle>Shortcuts</Subtitle>

          <ScrollView 
          horizontal={true} 
          style={{paddingBottom:15, paddingTop:15, flexDirection:"row"}} 
          showsHorizontalScrollIndicator={false}>    
            <Action 
            Image={require('./assets/logo-swift.png')}
            Text="Schedule Cart" />
            
            <Action 
            Image={require('./assets/logo-vue.png')}
            Text="Pick Food Up" />
            
            <Action 
            Image={require('./assets/logo-vue.png')}
            Text="Schedule Leave Time" />
          </ScrollView>

          <Subtitle>MY ORDERS</Subtitle>
          <ScrollView 
          horizontal={true} 
          style={{paddingBottom:30}} 
          showsHorizontalScrollIndicator={false}>
            {MyOrders.map((order, index) => (
              <Card 
              key = {index}
              CartTitle= {order.cart_title}
              Image= {order.image}
              Progress={order.progress}
              Caption={order.order_title}
              Time={order.order_time} />
            ))}    
            </ScrollView>
            <Subtitle>Scheduled Cartz</Subtitle>
            {CartzNearby.map((cart, index) => (
                <Cart 
                  key={index}
                  Image={cart.Image}
                  Market_name={cart.Market_name}
                  Time={cart.order_time}
                  Deliverer={cart.Deliverer} 
                />
            ))}
          </ScrollView>

        </SafeAreaView>
    </Container>
  );
}


const Subtitle = styled.Text`
  color:#C8C8C8;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`



const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`; 

const Avatar = styled.Image`
  width:44px;
  height: 44px;
  background: gray;
  border-radius: 22px;
  margin-left: 22px;
  position: absolute;
  top:0;
  left:0;
`

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;  
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;  
`;


const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;


const MyOrders = [
  {
    cart_title: "Asian Food Market",
    image: require('./assets/background1.jpg'),
    progress: 'alert',
    order_title: "Asian Food Marker",
    order_time: "Sunday @ 2 PM"
  },
  {
    cart_title: "Asian Food Market",
    image: require('./assets/background1.jpg'),
    progress: 'done',
    order_title: "Asian Food Marker",
    order_time: "Sunday @ 2 PM"
  }
]

const CartzNearby = [
  {
    Market_name: "Walmart",
    Image: require('./assets/walmart.jpeg'),
    Deliverer: "Huzaifa",
    order_time: "Sunday @ 2 PM"
  },
  {
    Market_name: "Asian Food Market",
    Image: require('./assets/asian_food_market.jpg'),
    Deliverer: "Edison",
    order_time: "Sunday, 3 PM"
  }
]
