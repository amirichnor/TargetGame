import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';

class RandomNumber extends Component {
 
  state = {};
  handlePress = () => {
    if (this.props.isDisabled) return{}
    this.props.onPress(this.props.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[
            styles.randomNumber,
            this.props.isDisabled && styles.selected,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  randomNumber: {
    fontSize: 30,
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});
export default RandomNumber;
