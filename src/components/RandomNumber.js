import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';

class RandomNumber extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View>
        <Text style={styles.randomNumber}>{this.props.number}</Text>
      </View>
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
});
export default RandomNumber;
