import React from "react"
import styled from "styled-components"


class Avatar extends React.Component{
    state = {
        photo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    }
    componentDidMount(){
        // fetch("https://uinames.com/api/?ext")
        // .then(response => response.json())
        // .then(response => {
        //     console.log(response)
        //     this.setState({
        //         photo: response.photo
        //     });
        // });
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