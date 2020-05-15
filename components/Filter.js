import React from 'react';
import styled from 'styled-components';


const FilterItem = props => (
    <Container>
        <Image source={props.Image} resizeMode="contain" />
        <Text>{props.Text}</Text>
    </Container>
)
export default FilterItem

const Container = styled.View `
    flex-direction: column;
    background: #503D9E;
    height: 110px;
    padding: 12px 16px 12px;
    border-radius:10px;
    box-shadow: 0 5px 10px rgba(0,0,0, 0.2);
    align-items: center;
    justify-content: center;
    margin: 0 8px;
`

const Image = styled.Image `
width: 36px;
height: 36px;
`

const Text = styled.Text `
 font-size: 15px;
 font-weight: 500;
 color:white;
 margin-top: 5px;
 margin-bottom: 5px;

 `

