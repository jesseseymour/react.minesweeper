import { Component } from 'react'
import Square from './square'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.rowLength = 8
    this.state = {
      squares: Array(parseInt(props.numSquares))
                .fill()
                .map(
                  (x,i) => (
                    {
                      'disabled':false,
                      'isFlagged':false,
                      'isBomb':false,
                      'nearBombs':null,
                      'adjacent':null,
                      'position':this.getPosition(i)
                    }
                  )
                ),
      isWinner: false,
      isLoser: false,
      firstMove: true
    }
  }

  getPosition = i => {
    let arr = [], numSquares = parseInt(this.props.numSquares), numColumns = parseInt(this.props.numColumns)
    if(i < this.rowLength){
      arr.push('top')
    }
    if(i >= numSquares - this.rowLength){
      arr.push('bottom')
    }
    if(i % numColumns === 0){
      arr.push('left')
    }
    if (i % numColumns === numColumns - 1) {
      arr.push('right')
    }
    return arr
  }

  

  componentWillMount(){
    switch(parseInt(this.props.level)){
      case 1:
        this.rowLength = 8
        break
      default:
        this.rowLength = 8
        break
    }

    //this.promiseTest()
    //console.log(myPromise)
    new Promise((resolve,reject) => {
                  resolve(this.state.squares)
                })
                .then(squares => this.generateBombs(squares))
                .then(squares => this.setAdjacents(squares))
                .then(squares => this.setState({squares}))
    console.log("state set")
    // this.setState({
    //   squares: this.generateBombs()
    // })
  }
  

  setAdjacents = squares => {
    squares.map((x,i) => {
      if(x.position.includes('top') && x.position.includes('left')){
        //x.adjacent = Array(3).fill
      }
    })
    // let square, arr = []
    // for (let j = 0; j < 8; j++){
    //   switch(j){
    //     case 0:
    //       square = i - this.rowLength - 1
    //       break
    //     case 1:
    //       square = i - this.rowLength
    //       break
    //     case 2:
    //       square = i - this.rowLength + 1
    //       break
    //     case 3:
    //       square = i - 1
    //       break
    //     case 4:
    //       square = i + 1
    //       break
    //     case 5:
    //       square = i + this.rowLength - 1
    //       break
    //     case 6:
    //       square = i + this.rowLength
    //       break
    //     case 7:
    //       square = i + this.rowLength + 1
    //       break
    //   }
    //   arr.push(square)
    // }
    return squares
  }

  generateBombs(squares){
    for(let i = 0; i < this.getNumBombs(); i++ ){
      let rand = this.getRandomSquare()
      squares[rand].isBomb ? i-- : squares[rand].isBomb = true
    }
    return squares
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
    const isBomb = this.state.squares[i].isBomb
    if (isBomb && this.state.firstMove) {
      this.moveBomb(i)
      return false
    }

    this.setState({firstMove: false})
    return isBomb
  }

  moveBomb = (i,orig) => {
    let squares = this.state.squares
    const _orig = typeof orig !== 'undefined' ? orig : i
    const j = i < squares.length - 1 ? i + 1 : 0
    if (!squares[j].isBomb){
      squares[j].isBomb = true
      squares[_orig].isBomb = false
      this.setState({squares:squares,firstMove:false})
    } else {
      this.moveBomb(j,_orig)
    }
  }

  //first col: index % numCol === 0
  //last col:  index % numCol === numCol - 1
  //first row: index < this.rowLength
  //last row:  index >= parseInt(this.props.numSquares) - this.rowLength

  handleLeftClick = (i) => {
    //console.log(i)
    //return

    if(this.state.squares[i].isFlagged){
      return
    }
    else if(this.checkForBomb(i) && this.state.firstMove) {
      this.moveBomb(i)
    }
    else if(this.checkForBomb(i)){
      this.setState({isLoser: true})
      return
    }
    

    
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
                isBomb={this.state.squares[i].isBomb}
                isFlagged={this.state.squares[i].isFlagged}
                onClick={() => this.handleLeftClick(i)}
                onRightClick={(e) => this.handleRightClick(e,i)}
                disabled={this.state.squares[i].disabled}
                id={i}
         />)
    }
    if(this.state.isLoser) alert("YOU ARE A LOSER :(")
    return (
      <div className={"board level-" + this.props.level}>
        {squares}
      </div>
      )
  }
}