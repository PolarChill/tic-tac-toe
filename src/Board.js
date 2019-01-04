import React from 'react';

import './index.css';
import { Square } from './Utils';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winFlagClassName={this.props.winFlagClassName[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  renderMatrix() {
    let matrix = [];
    for (let m = 0; m < 3; m++) {
      let children = [];
      for (let n = 0; n < 3; n++) {
        {
          children.push(this.renderSquare(m * 3 + n));
        }
      }
      matrix.push(
        <div key={m + '' + m} className="board-row">
          {children}
        </div>
      );
    }
    return matrix;
  }

  createTable = () => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>);
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  };

  render() {
    return (
      <div>
        <div className="status" />
        {this.renderMatrix()}
      </div>
    );
  }
}
