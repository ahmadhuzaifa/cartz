import React from "react"
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/orderScreen"
import OrdersScreen from "../screens/ordersScreen"

import { Ionicons } from "@expo/vector-icons"
    
const activeColor = "#06CFC2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Order: OrderScreen
}, {
    mode: "modal"
});
HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = true;
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName == "Order") {
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
        />
        )
    }
};

const OrderStack = createStackNavigator({
    Order: OrdersScreen
});


OrderStack.navigationOptions = {
    tabBarLabel: "My Orders",
    tabBarIcon: ({focused}) => (
        <Ionicons
        name="ios-pricetags"
        size={26}
        color={focused ? activeColor : inactiveColor}
        />
    )
};
const ProjectsStack = createStackNavigator({
    Order: OrderScreen
});


const TabNavigator = createBottomTabNavigator({
    HomeStack,
    OrderStack
},
{
  tabBarOptions: {
    activeTintColor: activeColor,
    inactiveTintColor: inactiveColor
  }
});




export default TabNavigator;