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
        <View style={styles.randomContainer}>
          {this.randomNumber.map((number, index) => (
            <RandomNumber number={number} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 40,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
export default Game;
