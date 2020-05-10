import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import RunCard from '../components/runCard';

import { Ionicons } from '@expo/vector-icons';
 
class MyRuns extends React.Component {
    static navigationOptions = {
        headerShown:false
    }
    render(){
        return (
                <Container>
                    <SafeAreaView>
                    <TitleBar>
                        <Title>Your Runs</Title>
                        <Ionicons 
                        name="md-add" 
                        size={30} 
                        color="#503D9E"
                        style={{ position: "absolute", right:20, top:5}} />
                    </TitleBar>
                    <ScrollView>
                      <Subtitle>Active</Subtitle>
                      <ScrollView 
                        horizontal={false} 
                        style={{paddingBottom:30}} 
                        showsHorizontalScrollIndicator={false}>
                            {ScheduledRuns.map((run, index) => (
                            <TouchableOpacity 
                            key = {index}
                            onPress={()=>{
                                this.props.navigation.navigate("Order", {
                                run: run
                                })}} >
                            <RunCard 
                            CartTitle= {run.name}
                            Image= {run.image}
                            Progress={run.progress}
                            Caption={run.order_title}
                            Time={run.scheduled_time}
                            />
                            </TouchableOpacity>
                            ))}  
                        </ScrollView>
                        <Subtitle>Completed</Subtitle>
                      <ScrollView 
                        horizontal={false} 
                        style={{paddingBottom:30}} 
                        showsHorizontalScrollIndicator={false}>
                            {ScheduledRuns.map((run, index) => (
                            <TouchableOpacity 
                            key = {index}
                            onPress={()=>{
                                this.props.navigation.navigate("Order", {
                                run: run
                                })}} >
                            <RunCard 
                            CartTitle= {run.name}
                            Image= {run.image}
                            Progress={run.progress}
                            Caption={run.name}
                            // Time={Moment(run.scheduled_time).format('hh:mm, DD MMM YYYY')}
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
export default MyRuns

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
const Subtitle = styled.Text`
  color: black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 0px;
  font-family: "Avenir Next";
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
