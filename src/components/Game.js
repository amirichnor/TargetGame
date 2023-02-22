import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import RandomNumber from './RandomNumber';

class Game extends Component {
  state = {selectedIds: [], remainingSecond: this.props.initialSecond};

  randomNumber = Array.from({length: this.props.randomNumber}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  target = this.randomNumber
    .slice(0, this.props.randomNumber - 2)
    .reduce((acc, curr) => acc + curr, 0);

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

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumber[curr];
    }, 0);
if(this.state.remainingSecond===0){
  return 'LOST'
}
    if (sumSelected > this.target) {
      return 'LOST';
    }
    if (sumSelected === this.target) return 'WON';
    if (sumSelected < this.target) return 'PLAYING';
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
              isDisabled={this.isSelected(index) || gameStatus !== 'PLAYING'}
              number={number}
              onPress={this.selectNumber}
            />
          ))}
        </View>
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
