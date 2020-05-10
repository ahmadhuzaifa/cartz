import React from 'react';
import styled from 'styled-components';


// const apiURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAArWVstcJ3MaGyVm4wk7VUfq8SuTs1Nz01cJWTLbdKleUVTfq7vaQMOxmhWz5AAtMGDfpsKmBq9CsfllsnEEMzrDM5znoJQ1QnHVAbApy_J4P1C7ZLNmQxL706dvlcHE9CEhByc9IjGjbryrbwDCUnzSXsGhQEZWKvvMgjzKuCZZVAQacklhuorA&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`
// const result =  await fetch(apiURL);
// console.log(result)

const RunCard = props => (
    <Container>
            {/* <Image source={props.Image} /> */}
            <Title>{props.CartTitle}</Title>
            <Subtitle>{props.Caption}</Subtitle>

    </Container>
) 
export default RunCard;


const Container = styled.View`
    background: #f0f3f5;
    width: 330px;
    height: 110px;
    border-radius: 14px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow; 0 5px 15px rgba(0,0,0,0.25);
    background: #503D9E;

`;
const Progress = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 22px;
    margin-left: 20px;
    margin-right: 20px;

`;

const Title = styled.Text `
    color:#FCD460;
    font-size: 22px;
    font-weight: 600;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;

    width: 100%;
`;
const Subtitle = styled.Text `
    color:white;
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 10px;

    margin-right: 20px;
    width: 100%;
`;


const ProgressImages = {
    "done": require('../assets/tick.png'),
    "alert": require('../assets/alert.png'),
  }
  
