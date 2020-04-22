
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen"
import OrderScreen from "../screens/orderScreen"
import TabNavigator from "./TabBar";
    
const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Order: OrderScreen
},
{ 
    mode: "modal"
})
export default createAppContainer(TabNavigator);
