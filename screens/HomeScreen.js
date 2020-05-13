import React from 'react';
import { 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  StatusBar, 
  RefreshControl } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/card';
import RunCard from '../components/runCard';
import { connect } from "react-redux"
import Avatar from '../components/Avatar';
import Action from '../components/Action';
import Menu from '../components/Menu';
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
      displayName:"",
      runs_array:[],
      latitude: null,
      longitude: null
    };

    static navigationOptions = {
      headerShown:false
    }
    componentDidUpdate(){
        this.toggleMenu()
    }

    componentDidMount(){
      const {email, displayName} = firebase.auth().currentUser
      this.setState({email, displayName});
      StatusBar.setBarStyle("dark-content", true)
      this.setUpRuns()
      this.checkAddress()
    }

    async checkAddress(){
      const uid = firebase.auth().currentUser.uid
      const apiURL = `https://afternoon-brook-22773.herokuapp.com/api/users/${uid}`;
      fetch(apiURL, {
          method: 'GET'
      })
      .then((response) => {
        response.text()
        if(response.status == 200 ||response.status == 201 ||response.status == 400){
          this.props.navigation.navigate("App")
        }
        else{
          this.props.navigation.navigate("AddAddress")
        }})
      .catch((error) => {
          console.error(error);
          return "AddAddress"
      });
    }

    async setUpRuns(){
      navigator.geolocation.getCurrentPosition(
        position =>{
          let region = {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: 5,
            longitudeDelta: 5
        };
        this.setState({location:region} , () => {
          this.getRuns();
      })
      },
      error => alert(error.message),
      {timeout:100});
    }

    async getRuns(){ 
      const uid = firebase.auth().currentUser.uid
      const radius = 50
      const apiURL = `https://afternoon-brook-22773.herokuapp.com/api/pickups?id=${uid}&lat=${this.state.location.latitude}&lng=${this.state.location.longitude}&radius=${radius}`;
      try{
        const results = await fetch(apiURL);
        const json = await results.json()
        this.setState({runs_array:json})
      }
      catch (err){
        this.setState({errorMessage:err.message})
      }
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

    _onRefresh = () => {
      this.setState({refreshing: true});
      this.getRuns().then(() => {
        this.setState({refreshing: false});
      });
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
                    <ScrollView style={{height:"100%"}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                      }>
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
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddRun")}}>
                        <Action 
                        Image={require('../assets/truck.png')}
                        Text="Schedule" />
                      </TouchableOpacity>    
                      <TouchableOpacity>
                        <Action 
                        Image={require('../assets/request.png')}
                        Text="Request" />
                      </TouchableOpacity>    
                    </ScrollView>
            
                    <Subtitle>Scheduled Runs Near you</Subtitle>
                    {this.state.runs_array.length ==  0 &&
                    <Text>No Active Runs Near You</Text>
                    }
                    <ScrollView 
                    horizontal={false} 
                    style={{paddingBottom:30}} 
                    showsHorizontalScrollIndicator={false}>
                        {this.state.runs_array.map((run, index) => (
                          <TouchableOpacity 
                          key = {index}
                          onPress={()=>{
                            this.props.navigation.navigate("Order", {
                              run: run
                            })}} >
                          <RunCard 
                          CartTitle= {run.destination.name}
                          Name={"By " + run.user.fullName}
                          Time={this.get_date_diff(run.scheduled_time)}
                          Description={"$".repeat(run.destination.price_level)}
                          Address={run.destination.formatted_address}
                          // Image={{uri:`https://maps.googleapis.com/maps/api/place/photo?photoreference=${run.destination.photos[2].photo_reference}&sensor=false&maxheight=1600&maxwidth=1600&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`}}
                          />
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
const Text = styled.Text`
  font-size: 15px;
  color: gray;
  font-weight: 500; 
  text-align: center;
  margin-top: 20px;
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
    name: "GameStop Sacramento",
    image: require('../assets/background7.jpg'),
    progress: 'done',
    order_title: "GameStop",
    order_time: "Sunday @ 2 PM",
    deliverer: "Huzaifa Ahmad",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    name: "Walmart",
    image: require('../assets/walmart.jpeg'),
    progress: 'done',
    order_title: "Going to Walmart",
    order_time: "Sunday @ 2 PM",
    deliverer: "Edison Li",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    name: "Asians Food Market",
    image: require('../assets/asian_food_market.jpg'),
    progress: 'alert',
    order_title: "Asian Food Market",
    order_time: "Sunday @ 2 PM",
    deliverer: "Huzaifa Ahmad",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    name: "Walmart",
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
