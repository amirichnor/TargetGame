import React, {Component} from 'react';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
     <Game randomNumber={6}/>
    );
  }
}

export default App;
