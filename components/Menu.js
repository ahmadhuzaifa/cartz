import React from "react";
import styled from 'styled-components';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
const ScreenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
    state = {
        top: new Animated.Value(ScreenHeight)
    };
    componentDidMount() {
        Animated.spring(this.state.top, {
            toValue: 0
          }).start();
    }
    toggleMenu = props => {
        Animated.spring(this.state.top, {
            toValue: ScreenHeight
          }).start();
    }

    render(){
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <Cover>
                    <Image source={require("../assets/background2.jpg")}></Image>
                    <Title>Huzaifa Ahmad</Title>
                    <Subtitle>ahmadhuzaifa012@gmail.com</Subtitle>
                </Cover>
                <TouchableOpacity
                onPress={this.toggleMenu}
                style={{
                    position: "absolute",
                    top: 180,
                    left: "50%",
                    marginLeft: -22,
                    zIndex: 1
                }}>
                    <CloseView>
                        <Ionicons 
                            name="ios-close" 
                            size={32} 
                            color="#546bfb"/>
                    </CloseView>
                </TouchableOpacity>
                <Content />
            </AnimatedContainer>
        );
    }
}
export default Menu

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View `
    position:absolute;
    background:white;
    width: 100%;
    height: 100%;
    z-index:100;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Cover = styled.View `
    height: 202px;
    background:black;
    justify-content: center;
    align-items: center;`

const Content = styled.Text `
    height: ${ScreenHeight};
    background: #f0f3f5;
`
const Image = styled.Image`
    position:absolute;
    height: 100%;
    width: 100%;`

const Title = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: 600;
    `

const Subtitle = styled.Text`
    font-size: 15px;
    color: rgba(255,255,255,0.5)
    `
