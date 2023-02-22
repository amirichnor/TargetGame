import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import RandomNumber from './RandomNumber';

class Game extends Component {
  state = {selectedIds: []};

  randomNumber = Array.from({length: this.props.randomNumber}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  target = this.randomNumber
    .slice(0, this.props.randomNumber - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumber[curr];
    }, 0);

    if (sumSelected > this.target) {
      return 'Lost';
    }
    if (sumSelected === this.target) return 'Won';
    if (sumSelected < this.target) return 'Playing';
  };
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`Status_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumber.map((number, index) => (
            <RandomNumber
              key={index}
              id={index}
              isDisabled={this.isSelected(index) || gameStatus !== 'Playing'}
              number={number}
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  Status_Playing: {
    backgroundColor: '#ddd',
  },
  Status_Lost: {
    backgroundColor: 'red',
  },
  Status_Won: {
    backgroundColor: 'green',
  },
});
export default Game;
