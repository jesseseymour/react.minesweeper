import { Component } from 'react'
import Square from './square'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      bombs: []
    }
  }

  componentWillMount(){
    this.setState({
      bombs: this.generateBombs()
    })
  }

  generateBombs(){
    const bombs = []
    for(let i = 0; i < this.getNumBombs(); i++ ){
      let rand = this.getRandomSquare()
      bombs.includes(rand) ? i-- : bombs.push(rand)
    }
    return bombs
  }

  getRandomSquare(){
    return Math.floor(Math.random() * this.getNumBombs())
  }

  getNumBombs(){
    switch(parseInt(this.props.level)){
      case 1:
        return 10
        break
      default:
        return 0
        break
    }
  }

  render() {
    let squares = []
    for(let i = 0; i < this.props.numSquares; i++){
      squares.push(<Square key={i} />)
    }
    return (
      <div className={"board level-" + this.props.level}>
        {squares}
      </div>
      )
  }
}