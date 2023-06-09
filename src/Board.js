import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    initialBoard = Array.from( {length:nrows} , () => {
      return Array.from( {length:ncols}, () => Math.random() < chanceLightStartsOn);
    })

    return initialBoard;
  }
  
  
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const win = board.every(row => row.every(cell => cell === false));
    if(win){
      return <h1>You won!</h1>
    }


  }



  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);  

      // TODO: return the copy
      return boardCopy;

    });

  }


  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  const a = board.map(e => (e.map(c=> {
    return c === true;
  })));

  console.log(a)



  return (
    <>
    <table className="Board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
                isLit={cell}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {hasWon()}
    </>
  )
  
  
  
  
  
  

}


export default Board;
