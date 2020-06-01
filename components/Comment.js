import React from 'react';
import styled from 'styled-components';
import { View , TouchableOpacity} from "react-native";


const Comment = props => (
    <Container>
        <UserName style={{textAlign: `${props.currentUser == true ? "right" : "left"}`}}>{props.currentUserName}</UserName>
        <TouchableOpacity>
            <MessageContainer style={{backgroundColor: `${props.currentUser == true ? "gray" : "#503D9E"}`, alignSelf: `${props.currentUser == true ? "flex-end" : "flex-start"}`}}>
                <Text selectable style={{textAlign: `${props.currentUser == true ? "right" : "left"}`}}>{props.Text}</Text>
            </MessageContainer>
        </TouchableOpacity>

    </Container>

)
export default Comment

const Container = styled.View `
    margin: 0px 5px;
`

const MessageContainer = styled.View `
    border-radius:10px;
    box-shadow: 0 5px 10px rgba(0,0,0, 0.2);
`
const Text = styled.Text `
    font-size: 15px;
    font-weight: 500;
    color:white;
    margin-left: 8px;
    padding: 20px 20px 20px 12px;
 `

 const UserName = styled.Text `
    font-size: 13px;
    font-weight: 600;
    color:#B0B0B0;
    font-style: italic;
    margin-bottom: 5px;
    margin-top: 5px;

 `

