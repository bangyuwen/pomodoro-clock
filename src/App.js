import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      secLeft: 25 * 60,
      isOn: false,
      type: 'session'
    }
    this.setSesstion = this.setSesstion.bind(this)
    this.setBreak = this.setBreak.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
  }
  setSesstion(e) {
    let action = e.target.innerHTML
    switch (action) {
      case '+':
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          secLeft: (this.state.sessionLength + 1) * 60
        })
        break;
      default:
        if (this.state.sessionLength === 1) return
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          secLeft: (this.state.sessionLength - 1) * 60
        })
    }
  }
  setBreak(e) {
    let action = e.target.innerHTML
    switch (action) {
      case '+':
        this.setState({
          breakLength: this.state.breakLength + 1,
          secLeft: (this.state.breakLength + 1) * 60
        })
        break;
      default:
        if (this.state.breakLength === 1) return
        this.setState({
          breakLength: this.state.breakLength - 1,
          secLeft: (this.state.breakLength - 1) * 60
        })
    }
  }
  toggleTimer() {
    console.log(this.state.isOn)
    if (this.state.isOn) {
      this.setState({isOn: false})
      return clearInterval(this.timer)
    }
    this.setState({
      isOn: true
    })
    this.timer = setInterval(()=> {
      let secLeft = this.state.secLeft
      if (secLeft === 0) {
        this.setState({
          secLeft: this.state.type === 'session' ?
                   this.state.breakLength * 60 :
                   this.state.sessionLength * 60,
          type: this.state.type === 'session' ? 'break' : 'session'
        })
      } else {
        this.setState({
          secLeft: secLeft - 1
        })
      }
    }, 1000)
  }
  render() {
    return (
      <div className="App">
        <h2>Pomodoro Clock</h2>
        <Countdown seconds={this.state.secLeft}
                   toggle={this.toggleTimer}
                   isOn={this.state.isOn}/>
        <SessionSetting set={this.setSesstion}
                        timeLength={this.state.sessionLength} />
        <BreakSetting set={this.setBreak}
                      timeLength={this.state.breakLength} />
      </div>
    )
  }
}

let Countdown = ({seconds, toggle, isOn}) => {
  let parseSeconds = (sec) => {
    let m = Math.floor(seconds / 60)
    let s = sec % 60
    s = s > 9 ? s : '0' + s
    return(`${m}:${s}`)
  }
  return(
    <div>
      <h1>{parseSeconds(seconds)}</h1>
      <button onClick={toggle}>{isOn ? 'Stop' : 'Start'}</button>
    </div>
  )
}


let SessionSetting = ({set, timeLength}) => (
  <div>
    <h3>session length</h3>
    <button onClick={set}>+</button>
    <span>{timeLength}</span>
    <button onClick={set}>-</button>
  </div>
)

let BreakSetting = ({set, timeLength}) => (
  <div>
    <h3>break length</h3>
    <button onClick={set}>+</button>
    <span>{timeLength}</span>
    <button onClick={set}>-</button>
  </div>
)

export default App;
