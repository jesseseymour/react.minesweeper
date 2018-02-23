import { Component } from 'react'
import Square from './square'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(parseInt(props.numSquares)).fill().map(() => ({'disabled':false,'isFlagged':false})),
      bombs: this.generateBombs(),
      firstMove: true
    }
  }

  componentWillMount(){
    
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
    return Math.floor(Math.random() * this.props.numSquares)
  }

  getNumBombs(){
    switch(parseInt(this.props.level)){
      case 1:
        return 10
      default:
        return 0
    }
  }

  checkForBomb = i => {
    return this.state.bombs.includes(i) ? true : false

    // if (isBomb && this.state.firstMove){
    //   this.moveBomb(i)
    // }

  }

  moveBomb = i => {

    //gotta find the bomb and remove from array, then search for the next available space
    let tempbombs = this.state.bombs
    if(i < this.state.squares.length){
      //tempbombs
    }
  }

  handleLeftClick = (i) => {
    if(this.checkForBomb(i) && this.state.firstMove) this.moveBomb(i)

    if(this.state.squares[i].isFlagged) return
    let tempsquares = this.state.squares
    tempsquares[i].disabled = true

    this.setState({
      squares: tempsquares
    })
  }

  handleRightClick = (event,i) => {
    event.preventDefault()
    let tempsquares = this.state.squares
    tempsquares[i].isFlagged = !tempsquares[i].isFlagged

    this.setState({
      squares: tempsquares
    })
  }

  render() {
    let squares = []
    for(let i = 0; i < this.props.numSquares; i++){
      squares.push(
        <Square key={i}
                isBomb={this.state.bombs.includes(i)}
                isFlagged={this.state.squares[i].isFlagged}
                onClick={() => this.handleLeftClick(i)}
                onRightClick={(e) => this.handleRightClick(e,i)}
                disabled={this.state.squares[i].disabled}
         />)
    }
    return (
      <div className={"board level-" + this.props.level}>
        {squares}
      </div>
      )
  }
}