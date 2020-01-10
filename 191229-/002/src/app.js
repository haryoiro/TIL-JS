import React from 'react'
import ReactDOM from 'react-dom'
import styles from './css/app.css'

export default class App extends React.Component {
  render() {
    return(
      <div id = "main">
        <h1 className = "title"> {"HELLO REACT"} </h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)