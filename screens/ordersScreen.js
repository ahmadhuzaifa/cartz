import React from "react"
import styled from "styled-components"
import { Button } from "react-native";

 
class OrdersScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
    render(){
        return (
            <Container>
                <Text>All Scheduled Screen</Text>
            </Container>
        )
    }
}
export default OrdersScreen


const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

const Text = styled.Text``;