import React from "react";
import styled from 'styled-components';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuItem from "./MenuItems";
import { connect } from "react-redux"

const ScreenHeight = Dimensions.get("window").height;

function mapStateToProps(state){
    return { action: state.action }
}

function mapDispatchToProps(dispatch){
    return {
        closeMenu: () => dispatch({
            type: "CLOSE_MENU"
        })
    }
}
    

class Menu extends React.Component {
    state = {
        top: new Animated.Value(ScreenHeight)
    };
    componentDidMount() {
        this.toggleMenu()
    }

    componentDidUpdate() {
        this.toggleMenu();
    }

    toggleMenu = () => {
        if (this.props.action == "openMenu"){
            Animated.spring(this.state.top, {
                toValue: 0
              }).start();    
        }
        if (this.props.action == "closeMenu"){
            Animated.spring(this.state.top, {
                toValue: ScreenHeight
              }).start();
        }
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
                onPress={this.props.closeMenu}
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

                <Content>
                    {MenuItemsList.map((item, index) => (
                        <MenuItem icon={item.icon} title={item.title} text={item.text} />
                    ))}
                </Content>
            </AnimatedContainer>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)

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
    align-items: center;
`;
const Content = styled.View `
    height: ${ScreenHeight};
    background: white;
    padding: 50px;
`;
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


const MenuItemsList = [
    {
        icon: "ios-settings",
        title: "Account",
        text: "Setting"
    },
    {
        icon: "ios-card",
        title: "Billing",
        text: "payments"
    },
    {
        icon: "ios-compass",
        title: "Billing",
        text: "payments"
    },
    {
        icon: "ios-exit",
        title: "Logout",
        text: "See you soon!"
    }
]