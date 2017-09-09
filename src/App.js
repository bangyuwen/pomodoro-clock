import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timer: [25, 0]
    }
    this.setSesstion = this.setSesstion.bind(this)
    this.setBreak = this.setBreak.bind(this)
  }
  setSesstion(e) {
    console.log(e.target.innerHTML)
  }
  setBreak(e) {
    console.log(e.target.value)
  }
  render() {
    return (
      <div className="App">
        <h2>Pomodoro Clock</h2>
        <Display timer={this.state.timer}/>
        <SessionSetting set={this.setSesstion}/>
        <BreakSetting set={this.setBreak}/>
      </div>
    )
  }
}

let Display = ({timer}) => (
  <div>
    <h1>{`${timer[0]} : ${timer[1]}`}</h1>
  </div>
)

let SessionSetting = ({set}) => (
  <div>
    <h3>session length</h3>
    <button onClick={set}>+</button>
    <button onClick={set}>-</button>
  </div>
)

let BreakSetting = ({set}) => (
  <div>
    <h3>break length</h3>
    <button onClick={set}>+</button>
    <button onClick={set}>-</button>
  </div>
)


export default App;
