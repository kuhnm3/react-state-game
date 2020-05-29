import React, { Component } from 'react';
import './App.css';
import states from './Components/State/states.json';
import State from './Components/State/State.js';
import Header from './Components/Header/Header.js'
import SubmitForm from './Components/SubmitForm/SubmitForm.js'
import Result from './Components/Result/Result.js'
import Messages from './Components/Messages/Messages.js'

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
      stateFeedback: null,
      inputText: "",
      currentIndex: 0,
      currentState: states[0],
      gameFinished: false,
      showHint: false
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
      this.setState({statesCorrect: statesCorrect, stateFeedback: true});
    }
    else {
      this.setState({stateFeedback: false})
    }

    let currentIndex = this.state.currentIndex;
    const lastIndex = this.state.states.length - 1;

    if (currentIndex === lastIndex) {
      this.setState({gameFinished: true});
    }
    else {
      this.showNextState(currentIndex); 
    }
  }

  showNextState = (index) => {
    const newIndex = index + 1;
    const newState = states[newIndex];

    setTimeout(function() {   
      this.setState({currentIndex: newIndex, currentState: newState, inputText: "", stateFeedback: null, showHint: false}) 
      this.focusInput();
    }
    .bind(this), 700);
  }

  handleHintShowing = () => {
    this.setState({showHint: true});
  }

  //This is a bandaid
  focusInput = () => {
    this.inputElement.focus();
  }

  restartGame = () => {
    let statesCorrectArray = [...this.state.statesCorrect];
    statesCorrectArray = [];

    if (this.state.gameFinished) {
      const states = [...this.state.states];

      for (var i = 0; i < states.length; i++){
        var rand = Math.floor(Math.random()* (states.length));
        var tmp = states[i];
        states[i] = states[rand];
        states[rand] = tmp;
     }

    this.setState({states: states, currentIndex: 0, currentState: states[0], inputText: "", statesCorrect: statesCorrectArray, stateFeedback: null, gameFinished: false}) 
    }
    else {
      this.setState({currentIndex: 0, currentState: states[0], inputText: "", statesCorrect: statesCorrectArray, gameFinished: false}) 
    }
  }

  render() {
    //would love a cleanner way to do this
    let results = null;
    if (this.state.gameFinished) {
      const amount = this.state.statesCorrect.length;
      let response = null;
      let gif = null;
      if (amount < 3) {
        response = "Oh damn, this is disappointing. You should really learn more about the states."
        gif = "https://media2.giphy.com/media/3o7Zesyac4CuSN5rsA/giphy.gif?cid=ecf05e478811ca2ba10e31fb82210ffb93ba4997afddfbb9&rid=giphy.gif"
      }
      else if (amount >= 3 && amount < 7) {
        response = "Alright alright, I mean you know some states, but you really gotta pick it up"
        gif = "https://media1.giphy.com/media/3rSNZwEP4gJsyWFDuI/giphy.gif?cid=ecf05e47046142b90c7b7188fb58f6f30c24cdfa7e8761c4&rid=giphy.gif"
      }
      else if (amount >= 7) {
        response = "Good job Fam. You know the states of this country. I am proud of yous"
        gif = "https://media3.giphy.com/media/Is1O1TWV0LEJi/giphy.gif?cid=ecf05e47cd22f7ad6b0f822fba5615d4346352e8ef0ff502&rid=giphy.gif"
      }
      results = (
        <Result amountCorrect={this.state.statesCorrect.length} response={response} image={gif} statesCorrect={this.state.statesCorrect} restart={this.restartGame} />
        
      )
    }

    let message = null;
    let messageImage = ""
    if (this.state.stateFeedback) {
      message = "Correct";
      messageImage = "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png";

    }
    else if (this.state.stateFeedback === false) {
      message = "Incorrect"
      messageImage = "https://cdn0.iconfinder.com/data/icons/shift-free/32/Incorrect_Symbol-512.png";
    }

    let hint = "";
    if (this.state.showHint) {
      hint = this.state.currentState.hint;
    }

    return (
      <div className="App">
        <Header correct={this.state.statesCorrect.length} restart={this.restartGame}/>
        {results}
        {this.state.gameFinished === false ?
        [
        <p className="state-title">Which state is this?</p>,
        <Messages message={message} messageImage={messageImage} />,
        <State
            index={this.state.currentState.id}
            key={this.state.currentState.id}
            name={this.state.currentState.name}
            image={this.state.currentState.image}
            showHint={this.handleHintShowing}
            hintMessage={hint}
          />,
          <SubmitForm changed={(event) => this.handleInput(event)} inputValue={this.state.inputText} clicked={this.checkMatch} reference={(inputEl) => { this.inputElement = inputEl}}/>
          ]
        : null
        }
      </div>

    )
  }
}

export default App;
