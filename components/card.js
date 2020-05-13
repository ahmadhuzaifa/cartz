import React from 'react';
import styled from 'styled-components';


// const apiURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAArWVstcJ3MaGyVm4wk7VUfq8SuTs1Nz01cJWTLbdKleUVTfq7vaQMOxmhWz5AAtMGDfpsKmBq9CsfllsnEEMzrDM5znoJQ1QnHVAbApy_J4P1C7ZLNmQxL706dvlcHE9CEhByc9IjGjbryrbwDCUnzSXsGhQEZWKvvMgjzKuCZZVAQacklhuorA&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`
// const result =  await fetch(apiURL);
// console.log(result)

const Card = props => (
    <Container>
        <Cover>
            <Image source={props.Image} />
            {/* <Title>{props.CartTitle}</Title> */}
        </Cover>
        <Content>
            <Progress source={ProgressImages[props.Progress]}/>
            <Wrapper>
                <Caption>{props.CartTitle}</Caption>
                <Subtitle>{props.Time}</Subtitle>
            </Wrapper>

        </Content>
    </Container>
) 
export default Card;

const Content = styled.View `
    flex-direction: row;
    align-items: center;
    height: 80px;
`;

const Caption = styled.Text `
    color: #3c4560
    font-size:20px;
    font-weight: 700;
`;

const Subtitle = styled.Text `
    color: #b8bece
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 5px;
    `;
const Wrapper = styled.View `
    margin-left:0px;`;

const Progress = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 22px;
`;


const Container = styled.View`
    background: #f0f3f5;
    width: 330px;
    height: 200px;
    border-radius: 14px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow; 0 5px 15px rgba(0,0,0,0.25);
`;


const Cover = styled.View `
    width:30%;
    height: 100px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    
    overflow: hidden;
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


const ProgressImages = {
    "done": require('../assets/tick.png'),
    "alert": require('../assets/alert.png'),
  }
  
