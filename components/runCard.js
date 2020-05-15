import React from 'react';
import styled from 'styled-components';

// const apiURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAArWVstcJ3MaGyVm4wk7VUfq8SuTs1Nz01cJWTLbdKleUVTfq7vaQMOxmhWz5AAtMGDfpsKmBq9CsfllsnEEMzrDM5znoJQ1QnHVAbApy_J4P1C7ZLNmQxL706dvlcHE9CEhByc9IjGjbryrbwDCUnzSXsGhQEZWKvvMgjzKuCZZVAQacklhuorA&key=AIzaSyBAvGGrNTSL5gSTLUDtaqzBObAUnze6JfA`
// const result =  await fetch(apiURL);
// console.log(result)

const RunCard = props => (
    <Container>
            <Image />
            <Title>{props.CartTitle}</Title>
            {/* <DescriptionSubtitle>{props.Description}</DescriptionSubtitle> */}
            {/* $$ - Restaurant, food */}
            {/* <DescriptionSubtitle style={{color:"#bdbdbd"}}>{props.Address}</DescriptionSubtitle> */}

            <Subtitle>{props.Name}</Subtitle>
            <TimeSubtitle>{props.Time}</TimeSubtitle>

    </Container>
) 
export default RunCard;


const Container = styled.View`
    background-color : #503D9E;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    width: 88%;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.15);

    padding-bottom: 25px;
    padding-top: 20px;
    padding-right: 27px;
    padding-left: 27px;
`;

const Title = styled.Text `
    font-size: 22px;
    font-weight: 700;

    width: 100%;
    color: white;
`;
// color:#FCD460;

const Subtitle = styled.Text `
    color: white;
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
    width: 100%;
`;
const DescriptionSubtitle = styled.Text `
    color: white;
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;

    width: 100%;
`;

const TimeSubtitle = styled.Text `
    color: #FCD460;
    font-size: 13px;
    font-weight: 400;
    margin-top: 5px;

    width: 100%;

`;
const Image = styled.Image `
    width:100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
`;

const ProgressImages = {
    "done": require('../assets/tick.png'),
    "alert": require('../assets/alert.png'),
  }
  
