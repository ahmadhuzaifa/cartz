
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen"
import OrderScreen from "../screens/orderScreen"

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Order: OrderScreen
})
export default createAppContainer(AppNavigator)