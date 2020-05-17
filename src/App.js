import React, { Component } from 'react';
import './App.css';
import states from './Components/State/states.json';
import State from './Components/State/State.js';
import Header from './Components/Header/Header.js'
import { throwStatement } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
   
    for (var i = 0; i < states.length; i++){
      var rand = Math.floor(Math.random()* (states.length));
      var tmp = states[i];
      states[i] = states[rand];
      states[rand] = tmp;
   }
  //  currentState = states[0]

    this.state = {
      states,
      statesCorrect: [],
      currentIndex: 0,
      currentState: states[0],
      gameFinished: false,
    };
  }

  checkInput = (event) => {
    let inputValue = event.target.value.toLowerCase();
    const correctValue = this.state.currentState.name;

    if (inputValue === correctValue) {
      console.log("state correct!")
      this.handleCorrectResponse(correctValue);
    }
    
  }

  handleCorrectResponse = (state) => {
    const statesCorrect = [...this.state.statesCorrect];
    statesCorrect.push(state);
    
    let currentIndex = this.state.currentIndex;

    this.setState({statesCorrect: statesCorrect});
    this.showNextState(currentIndex);

  }

  showNextState = (index) => {
    const newIndex = index + 1;
    const newState = states[newIndex]
    console.log(newIndex, newState);

    setTimeout(function() {   
      this.setState({currentIndex: newIndex, currentState: newState}) 
    }
    .bind(this), 300);
  }

  render() {
    return(
      <div className="App">
        <Header correct={this.state.statesCorrect.length}/>
        <p className="state-title">Which state is this?</p>
        <State
          isVisible={this.state.currentState.visible}
          feedback={this.state.currentState.feedback}
          index={this.state.currentState.id}
          key={this.state.currentState.id}
          name={this.state.currentState.name}
          image={this.state.currentState.image}
          changed = {(event) => this.checkInput(event)}
        />
      </div>
    )
  }
}

export default App;
