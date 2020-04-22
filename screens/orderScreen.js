import React from "react"
import styled from "styled-components"

class OrderScreen extends React.Component {
    render(){
        return (
            <Container>
                <Text>YOUR ORDER</Text>
            </Container>
        )
    }
}

export default OrderScreen

const Container = styled.View`
    flex:1;`
const Text = styled.Text``