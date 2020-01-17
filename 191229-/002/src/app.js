import React from 'react'
import ReactDOM from 'react-dom'
import Todo from "./todo";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: "",
      todos: [], 
      time: new Date(), 
      intervalId: "",
      speech: new webkitSpeechRecognition()
    }
    this.tick = this.tick.bind(this)
    this.addToDo = this.addToDo.bind(this)
    this.removeToDo = this.removeToDo.bind(this)
  }

  componentDidMount(){
    let id = setInterval(this.tick, 1000)
    this.setState({intercalId: id})
  }
  componentWillUnmount() {
    clearInterval(this.state.intercalId)
  }
  addToDo() {
    let { todos, input } = this.state
    todos = todos.concat(input)
    this.setState({todos: todos, input: ""})
  }
  removeToDo(i) {
    let { todos } = this.state
    todos = todos.slice(0, i).concat(todos.slice(i + 1))
    this.setState({todos:todos, input:""})
  }
  tick(){
    let { time } = this.state
    time.setSecond(time.getSeconds() + 1)
    this.setState({time: time})
  }
  render() {
    return(
      <div>
        <h1>New Task</h1>
        <input type="text" onChange={e => this.setState({input: e.target.value})} value={this.state.input}/>
        <button onClick={this.addToDo}>ADD</button>
        <h2>Now</h2>
        <span>{this.state.time.toLocaleTimeString()}</span>
        <h2>ToDo:</h2>
        <Todo todos={this.state.todos} removeToDo={this.removeToDo} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)