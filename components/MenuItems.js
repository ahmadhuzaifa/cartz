import react from "react"
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';


const MenuItems = props => (
    <Container>
        <IconView>
            <Ionicons 
                name={props.icon}
                size={22} 
                color="#546bfb"/>
        </IconView>
    </Container>
)