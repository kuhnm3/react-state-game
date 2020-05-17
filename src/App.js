import React, { Component } from 'react';
import './App.css';
import states from './Components/State/states.json';
import State from './Components/State/State.js';
import Header from './Components/Header/Header.js'
import SubmitForm from './Components/SubmitForm/SubmitForm.js'

class App extends Component {
  constructor(props) {
    super(props);
   
    for (var i = 0; i < states.length; i++){
      var rand = Math.floor(Math.random()* (states.length));
      var tmp = states[i];
      states[i] = states[rand];
      states[rand] = tmp;
   }

    this.state = {
      states,
      statesCorrect: [],
      inputText: "",
      currentIndex: 0,
      currentState: states[0],
      gameFinished: false,
    };
  }

  componentDidMount(){
    this.inputElement.focus();
  }

  handleInput = (event) => {
    let inputValue = event.target.value.toLowerCase();
    this.setState({inputText: inputValue});
  }

  checkMatch = () => {
    const inputValue = this.state.inputText;
    const correctValue = this.state.currentState.name;

    if (inputValue === correctValue) {
      const statesCorrect = [...this.state.statesCorrect];
      statesCorrect.push(correctValue);
      this.setState({statesCorrect: statesCorrect});
    }

    let currentIndex = this.state.currentIndex;

    this.showNextState(currentIndex);  
  }

  showNextState = (index) => {
    const newIndex = index + 1;
    const newState = states[newIndex]
    console.log(newIndex, newState);

    setTimeout(function() {   
      this.setState({currentIndex: newIndex, currentState: newState, inputText: ""}) 
      this.focusInput();
    }
    .bind(this), 300);
  }

  //This is a bandaid
  focusInput = () => {
    this.inputElement.focus();
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
        />
        <SubmitForm changed={(event) => this.handleInput(event)} inputValue={this.state.inputText} clicked={this.checkMatch} reference={(inputEl) => { this.inputElement = inputEl}}/>
      </div>

    )
  }
}

export default App;
