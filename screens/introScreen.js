import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

const slides = [
  {
    key: "1",
    title: 'Welcome to Cartz',
    text: 'A delivery service powered by\n your community!',
    image: require('../assets/icon_transparent.png'),
    backgroundColor: '#FCD660',
    textColor: "#401BAE"
  },
  {
    key: "2",
    title: 'Out of groceries?',
    text: 'Ask your neighbors! Simply put in your\n request and get your items delivered!',
    image: require('../assets/delivery.png'),
    backgroundColor: '#401BAE',
    textColor: "white"

  },
  {
    key: "3",
    title: 'Help a neighbor out!',
    text: 'When going out to buy items\n let your neighbors know!',
    image: require('../assets/megaphone.png'),
    backgroundColor: '#401BAE',
    textColor: "white"

  },

];
 
export default class IntroScreen extends React.Component {

  static navigationOptions = {
    headerShown:false
  }
  _renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor:item.backgroundColor,flex: 1, justifyContent: 'center', alignItems: "center"}}>
          <Text style={[styles.title, {color:item.textColor}]}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
          <Text style={[styles.text, {color:item.textColor}]}>{item.text}</Text>
        </View>
    );
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _onDone = () => {
    this.props.navigation.navigate("Login")
  }
  render() {
      return <AppIntroSlider renderItem={this._renderItem} data={slides}
      renderNextButton={this._renderNextButton}
      onDone={this._onDone}
      renderDoneButton={this._renderDoneButton}
      />;
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  image: {
    maxHeight: 320,
    maxWidth: 320,
    // height: "auto",
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: "500",
    fontSize: 15,
    fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
    fontFamily: Platform.select({ ios: `Avenir Next`, android: `Roboto` }),

  },
  //[...]
});