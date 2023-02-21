import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import RandomNumber from './RandomNumber';

class Game extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  randomNumber = Array.from({length: this.props.randomNumber}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumber
    .slice(0, this.props.randomNumber - 2)
    .reduce((acc, curr) => acc + curr, 0);
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <RandomNumber number={this.randomNumber}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    margin: 40,
  
  },
  target: {
    fontSize: 30,
    textAlign: 'center',
  },
});
export default Game;
