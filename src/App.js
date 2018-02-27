import { Component } from 'react'
import Board from './components/board'

class App extends Component {
  render() {
    return(
      <Board level="1"
             numSquares="64"
             numColumns="8"
             numRows="8" />
    )
  }
}

export default App