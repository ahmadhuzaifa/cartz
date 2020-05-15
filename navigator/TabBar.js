import React from "react"
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/HomeScreen";
import RunScreen from "../screens/runScreen"
import OrdersScreen from "../screens/myOrdersScreen"
import MyRuns from "../screens/myRuns"
import Perks from "../screens/perks"
import AddScheduledRun from "../screens/add_run/add_run";
import AddScheduledRun2 from "../screens/add_run/add_run2";
import RequestScreen from "../screens/requestScreen";

import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons"
import AddAddress from "../screens/auth/addAddress";

const activeColor = "#503D9E";
const inactiveColor = "#b8bece";



const AddRun = createStackNavigator({
    AddRun1: AddScheduledRun,
    AddRun2: AddScheduledRun2
})
AddRun.navigationOptions =  {
    headerShown:false
}

const RunStack = createStackNavigator({
    RunScreen: RunScreen,
    RequestScreen: RequestScreen
})
RunStack.navigationOptions =  {
    headerShown:false
}


const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AddRun: AddRun,
    AddAddress: AddAddress, 
    RunStack: RunStack
}, 
{
    mode: "modal"
});
HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == "RunStack"  || routeName == "AddRun" )  {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
        <Ionicons
            name="ios-home"
            size={26}
            color={focused ? activeColor : inactiveColor}
        />)
    }
};


const PerksStack = createStackNavigator({
    Perks: Perks
});
PerksStack.navigationOptions = {
    tabBarLabel: "Perks",
    tabBarIcon: ({focused}) => (
        <FontAwesome5
        name="grin-stars"
        size={26}
        color={focused ? activeColor : inactiveColor}
        />
    )
};



const OrderStack = createStackNavigator({
    Order: OrdersScreen
});
OrderStack.navigationOptions = {
    tabBarLabel: "My Orders",
    tabBarIcon: ({focused}) => (
        <Entypo
        name="shopping-bag"
        size={26}
        color={focused ? activeColor : inactiveColor}
        />
    )
};



const RunsStack = createStackNavigator({
    Run: MyRuns,
    RunStack: RunStack,
    AddRun: AddRun,
}, 
{
    mode: "modal"
});
RunsStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == "RunStack")  {
        tabBarVisible = false;
    }
    return {
    tabBarVisible,
    tabBarLabel: "My Runs",
    tabBarIcon: ({focused}) => (
        <FontAwesome5
        name="running" size={24}
        color={focused ? activeColor : inactiveColor}/>
    )
    }
};



const TabNavigator = createBottomTabNavigator({
    HomeStack,
    PerksStack,
    RunsStack,
    OrderStack,
},
{
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor: inactiveColor
  }
});

export default TabNavigator;