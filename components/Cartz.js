import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

const Cart = props => (
    <Container>
        <Cover>
            <Image source={props.Image} />
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'transparent']}
                style={{position: 'absolute', height: 50, width: '100%',}}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={{position: 'absolute', height: 50, width: '100%', bottom:0}}
            />
            <Title>{props.Market_name}</Title>
            <Content>
                <Caption>{props.Deliverer}</Caption>
                <Subtitle>{props.Time}</Subtitle>
            </Content>

        </Cover>

    </Container>
)
export default Cart;

const Container = styled.View`
    width: 318px;
    height: 180px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow: 0 5px 10px rgba(0,0,0, 0.35);
`;

const Cover = styled.View `
    width:100%;
    height: 100%;
    border-radius: 7px;
    overflow: hidden;
`;

const Content = styled.View `
    padding-left: 20px;
    flex-direction: column;
    position: absolute;
    bottom:30;
    height: 30px;
`;
const Image = styled.Image `
    width:100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
`;

const Title = styled.Text `
    color:white;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 20px;
    width: 170px;
`;

const Caption = styled.Text `
    color: white;
    font-size:20px;
    font-weight: 600;
`;

const Subtitle = styled.Text `
    color: white;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 5px;
    `;