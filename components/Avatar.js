import React from "react"
import styled from "styled-components"

import firebase from '@firebase/app';
require('firebase/auth');

class Avatar extends React.Component{
    state = {
        photo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    }
    componentDidMount(){
        const photo = firebase.auth().currentUser.photo
        if (photo){
            this.setState({
                photo: photo
            });
        }

    }

    render(){
        return (
            <Image source={{uri: this.state.photo}} />
        )
    }
}

export default Avatar


const Image = styled.Image`
  width:44px;
  height: 44px;
  border-radius: 22px;
  background: gray;
`