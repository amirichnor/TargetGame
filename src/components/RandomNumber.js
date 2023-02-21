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
const styles = StyleSheet.create({randomNumber:{
    // flex:1,
    backgroundColor:"#666",
    
}});
export default RandomNumber;
