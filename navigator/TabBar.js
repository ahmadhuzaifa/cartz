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
import CartConfirmation from "../screens/add_run/cart_confirmation";
import RequestScreen from "../screens/requests/requestScreen";
import RequestItemScreen from "../screens/requests/requestItemScreen"
import BarcodeScanView from "../screens/barcodeScan"
import RequestSummary from "../screens/requests/requestSummary"
import OrderDetailScreen from "../screens/orderDetailScreen"
import RequestDetailScreen from "../screens/requestDetailScreen.js"


import { Ionicons, FontAwesome5, Entypo, Feather } from "@expo/vector-icons"
import AddAddress from "../screens/auth/addAddress";

const activeColor = "#503D9E";
const inactiveColor = "#b8bece";



const AddRun = createStackNavigator({
    AddRun1: AddScheduledRun,
    AddRun2: AddScheduledRun2,
    CartConfirmation: CartConfirmation
})
AddRun.navigationOptions =  {
    headerShown:false
}

const RunStack = createStackNavigator({
    RunScreen: RunScreen,
    RequestScreen: RequestScreen,
    RequestItemScreen:RequestItemScreen,
    RequestSummary: RequestSummary,
    BarcodeScanner: BarcodeScanView,
    OrderDetailScreen: OrderDetailScreen,
    RequestDetailScreen: RequestDetailScreen
})
RunStack.navigationOptions =  {
    headerShown:false
}


const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AddRun: AddRun,
    AddAddress: AddAddress, 
    RunStack: RunStack,
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
    Order: OrdersScreen,
    OrderDetailScreen: OrderDetailScreen,
    RequestDetailScreen: RequestDetailScreen
});
OrderStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == "OrderDetailScreen" || routeName == "RequestDetailScreen")  {
        tabBarVisible = false;
    }
    return {
    tabBarVisible,
    tabBarLabel: "My Orders",
    tabBarIcon: ({focused}) => (
        <Entypo
        name="shopping-bag"
        size={26}
        color={focused ? activeColor : inactiveColor}
        />

    )
    }
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
    tabBarLabel: "My Cartz",
    tabBarIcon: ({focused}) => (
        <Entypo
        name="shopping-cart" size={26}
        color={focused ? activeColor : inactiveColor}/>
    )
    }
};



const TabNavigator = createBottomTabNavigator({
    HomeStack,
    // PerksStack,
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