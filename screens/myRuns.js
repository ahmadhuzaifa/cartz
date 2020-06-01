import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Easing, RefreshControl, Button } from 'react-native';
import styled from 'styled-components';
import RunCard from '../components/runCard';

import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';

import Moment from 'moment';


require('firebase/auth');
class MyRuns extends React.Component {
    static navigationOptions = {
        headerShown:false
    }

    constructor(props) {
      super(props);
   
      this.state = {
        activeRuns: [],
        passedRuns: [],
        closedRuns: [],
        refreshing: false
      }
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
    async getData(){
      const uid = firebase.auth().currentUser.uid
      const apiURL = `https://afternoon-brook-22773.herokuapp.com/api/users/${uid}/pickups`;
      try{
        const results = await fetch(apiURL);
        const json = await results.json()
        const active = json.filter(run => run.status.includes('active'))
        const closed = json.filter(run => run.status.includes('closed'))

        const active_future = active.filter(run => new Date(run.scheduled_time) >= new Date())
        const active_passed = active.filter(run => new Date(run.scheduled_time) <= new Date())

        const completed = json.filter(run => run.status.includes('completed'))

        this.setState({activeRuns:active_future})
        this.setState({passedRuns:active_passed})
        this.setState({closedRuns:closed})
      }
      catch (err){
          this.setState({errorMessage:error.message})
      }
    }
    
    render(){
        return (
          <Container>
            <SafeAreaView>

              <TitleBar>
                <Title>Your Cartz</Title>
                <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate("AddRun")
                }}
                style={{ position: "absolute", right:20, top:5}} >
                  <Ionicons 
                  name="md-add" 
                  size={30} 
                  color="#503D9E"
                />
                </TouchableOpacity>

              </TitleBar>

              <ScrollView style={{height:"100%", paddingBottom: 200}}
                refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  />
                }>
                {this.state.errorMessage != null &&
                  <Text>{this.state.errorMessag}</Text>
                }
                
                <Subtitle>Open Cartz</Subtitle>
                {this.state.activeRuns.length  ==  0 &&
                  <Text>No active cart. Click "+" to start one</Text>
                }
                {this.state.activeRuns.sort(function(a,b){
                          return new Date(a.scheduled_time) - new Date(b.scheduled_time) ;
                  }).map((run, index) => (
                  <TouchableOpacity 
                  key = {index}
                  onPress={()=>{
                    this.props.navigation.navigate("RunScreen", {
                      run: run
                      })}} >
                      <RunCard 
                      CartTitle= {run.destination.name}
                      Progress={run.status}
                      Time={this.get_date_diff(run.scheduled_time)}
                      Description={"$".repeat(run.destination.price_level)}
                      Name={run.destination.formatted_address}

                      />
                  </TouchableOpacity>
                  ))}  
                  {this.state.passedRuns.length > 0 &&
                    <Subtitle>Passed Cartz</Subtitle>
                  }
                  {this.state.passedRuns.sort(function(a,b){
                          return new Date(b.scheduled_time) - new Date(a.scheduled_time);
                  }).map((run, index) => (
                  <TouchableOpacity 
                  key = {index}
                  onPress={()=>{
                    this.props.navigation.navigate("RunScreen", {
                      run: run
                      })}} >
                        <RunCard 
                        CartTitle= {run.destination.name}
                        Progress={run.status}
                        Time= {`Scheduled for ${Moment(run.scheduled_time).format("h:mm a, Do MMM, YYYY")}`}
                        Name={run.destination.formatted_address}

                        />
                  </TouchableOpacity>
                  ))} 
                  {this.state.closedRuns.length > 0 &&
                    <Subtitle>Closed Cartz</Subtitle>
                  }
                  {this.state.closedRuns.sort(function(a,b){
                          return new Date(a.scheduled_time) - new Date(b.scheduled_time) ;
                  }).map((run, index) => (
                  <TouchableOpacity 
                  key = {index}
                  onPress={()=>{
                      this.props.navigation.navigate("RunScreen", {
                      run: run
                      })}} >
                   <RunCard 
                        CartTitle= {run.destination.name}
                        Progress={run.status}
                        Time= {`Scheduled for ${Moment(run.scheduled_time).format("h:mm a, Do MMM, YYYY")}`}
                        Name={run.destination.formatted_address}/>
                  </TouchableOpacity>
                  ))} 
                </ScrollView>
            </SafeAreaView>
        </Container>
        )
    }
}
export default MyRuns

const Container = styled.View`
  background-color: white;
  overflow: hidden;
  flex: 1;
`; 
const TitleBar = styled.View`
  width: 100%;
  padding-left: 27px;
  height: 50px;
  margin-top: ${Platform.select({ ios: `20px`, android: `60px` })};
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


const Subtitle = styled.Text`
  color: black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
  font-family: ${Platform.select({ ios: `Avenir Next`, android: `Roboto` })};;
  padding-left: 10px;

`

const ScheduledRuns = [
  {
    name: "Asians Food Market",
    image: require('../assets/asian_food_market.jpg'),
    progress: 'done',
    order_title: "Completed Yesterday",
    order_time: "Sunday @ 2 PM",
    deliverer: "Huzaifa Ahmad",
    deliverer_image: require('../assets/avatar.jpg')
  },
  {
    name: "Walmart",
    image: require('../assets/background1.jpg'),
    progress: 'done',
    order_title: "Scheduled for tomorow",
    order_time: "Sunday @ 2 PM",
    deliverer: "Edison Li",
    deliverer_image: require('../assets/avatar.jpg')
  }
]
