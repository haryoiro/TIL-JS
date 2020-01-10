import React from 'react'
import ReactDOM from 'react-dom'
import styles from './css/app.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.onClickButton = this.onClickButton.bind(this)
  }
  onClickButton() {
    let { count } = this.state
    this.setState({count: count + 1})
  }
  render() {
    return(
      <div id = "main">
        <h1>{`クリックした回数 ${this.state.count}`}</h1>
        <button onClick={this.onClickButton}>Button</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App name={"HARYO"}/>,
  document.getElementById('app')
)