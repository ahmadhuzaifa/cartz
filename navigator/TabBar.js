import React from "react"
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/orderScreen"
import OrdersScreen from "../screens/myOrdersScreen"
import MyRuns from "../screens/myRuns"
import Perks from "../screens/perks"
import AddScheduledRun from "../screens/add_run/add_run";
import AddScheduledRun2 from "../screens/add_run/add_run2";

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



const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Order: OrderScreen,
    AddRun: AddRun,
    AddAddress: AddAddress
}, 
{
    mode: "modal"
});
HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == "Order"  || routeName == "AddRun" )  {
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
    RunsScreen: OrderScreen,
    AddRun: AddRun,
}, 
{
    mode: "modal"
});
RunsStack.navigationOptions = {
    tabBarLabel: "My Runs",
    tabBarIcon: ({focused}) => (
        <FontAwesome5
        name="running" size={24}
        color={focused ? activeColor : inactiveColor}/>
    )
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