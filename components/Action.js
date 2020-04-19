import React from 'react';
import styled from 'styled-components';


const Action = props => (
    <Container>
        <Image source={props.Image} resizeMode="contain" />
        <Text>{props.Text}</Text>
    </Container>
)
export default Action


const Container = styled.View `
    flex-direction: row;
    background: white;
    height: 60px;
    padding: 12px 16px 12px;
    border-radius:10px;
    box-shadow: 0 5px 10px rgba(0,0,0, 0.05);
    align-items: center;
    margin: 0 8px;
`

const Image = styled.Image `
width: 36px;
height: 36px;`

const Text = styled.Text `
 font-size: 15px;
 margin-left: 8px;
 `