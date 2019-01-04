import React from 'react';

import './index.css';
import { calculateWinner } from './Utils';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      xIsNext: true,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      postion: [],
      winFlagClassName: Array(9).fill('')
    };
  }
  handleHighlightCell = squares => {
    if (calculateWinner(squares)) {
      let winFlagClassName = this.state.winFlagClassName.slice();

      calculateWinner(squares)[1].forEach(i => {
        winFlagClassName[i] = 'square-highlight';
      });
      // 获胜放更新样式
      this.setState({ winFlagClassName: winFlagClassName });
    }
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    // 已得出胜负 or 该位置已有棋子
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      postion: this.state.postion.concat(i),
      history: history.concat([
        {
          squares: squares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1
    });
    this.handleHighlightCell(squares);
  };
  jumpTo(step) {
    this.setState({
      //history: this.state.history.slice(0, step + 1),
      winFlagClassName: Array(9).fill(''),
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history, xIsNext, stepNumber, postion } = { ...this.state };
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      //计算棋子所在的坐标
      let coordinate =
        Math.ceil((postion[move - 1] + 1) / 3) +
        ' , ' +
        ((postion[move - 1] + 1) % 3 === 0 ? 3 : (postion[move - 1] + 1) % 3);
      const desc = move ? (move % 2 === 0 ? 'X: ' : ' O: ') + 'Go to move ( ' + coordinate + ' )' : 'Go to game start';
      return (
        <li key={move}>
          <button className="button-info" onClick={this.jumpTo.bind(this, move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
      // 如果出现胜负  循环调用 刷新页面
      //   this.handleHighlight(setState);
    } else if (!winner && this.state.stepNumber === 9) {
      status = 'The game ended in a draw';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={this.handleClick}
            winFlagClassName={this.state.winFlagClassName}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
