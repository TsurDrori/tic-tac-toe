import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      table: Array(this.props.boardSize).fill(Array(this.props.boardSize).fill({}))
    }
  }

  renderSquare(i, j) {
    return (
      <Square key={j}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    // console.log('table:', this.state.table, 'this.props.boardSize:', this.props.boardSize);
    let num = 0;
    return (
      <div>
        {this.state.table.map((row, i) => {
          return (
            <div key={i} className="board-row">
              {row.map((item, j) => {
                console.log(num);
                item = this.renderSquare(num , j)
                num++
                return  item
                }
                )}
            </div>
          )
        }
        )}
        {/* <div className="board-row">
        {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}