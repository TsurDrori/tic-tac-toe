import React from 'react';
import { Board } from './Board';
import { calculateWinner } from '../game-service';

export class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      boardSize: 3,
    }
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      console.log('this.stepNumber:', this.state.stepNumber, 'move:', move);
      if (move) {
        return (
          <div key={move} className={`game-board history-item ${(this.state.stepNumber === move) ? 'bold' : ''}`}>
            <Board
              boardSize={this.state.boardSize}
              squares={step.squares}
              onClick={() => this.jumpTo(move)}
            />
          </div>
        )
      } else {
        return (
          <div key={move} >
            <button onClick={() => this.jumpTo(move)}>go to game start</button>
          </div>
        )
      }
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardSize={this.state.boardSize}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className='history-list'>{moves}</div>
        </div>
      </div>
    );
  }
}