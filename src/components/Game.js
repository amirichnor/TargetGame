import {Button, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
class Game extends Component {
  state = {selectedIds: [], remainingSecond: this.props.initialSecond};

  randomNumber = Array.from({length: this.props.randomNumber}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  gameStatus = 'PLAYING';

  target = this.randomNumber
    .slice(0, this.props.randomNumber - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffleRandomNumbers = shuffle(this.randomNumber);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSecond: prevState.remainingSecond - 1};
        },
        () => {
          if (this.state.remainingSecond === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount(nextProps, nextState) {
    clearInterval(this.intervalId);
  }
  isSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSecond === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }
  calcGameStatus = nextState => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffleRandomNumbers[curr];
    }, 0);

    if (nextState.remainingSecond === 0) {
      return 'LOST';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
    if (sumSelected === this.target) return 'WON';
    if (sumSelected < this.target) return 'PLAYING';
  };
  render() {
    const gameStatus = this.gameStatus;

    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`Status_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffleRandomNumbers.map((number, index) => (
            <RandomNumber
              key={index}
              id={index}
              isDisabled={this.isSelected(index) || gameStatus !== 'PLAYING'}
              number={number}
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {gameStatus !== 'PLAYING' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
        <Text style={{margin: 40}}>{this.state.remainingSecond}</Text>
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
  Status_PLAYING: {
    backgroundColor: '#ddd',
  },
  Status_LOST: {
    backgroundColor: 'red',
  },
  Status_WON: {
    backgroundColor: 'green',
  },
});
export default Game;
