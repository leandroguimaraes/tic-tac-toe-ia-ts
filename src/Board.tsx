import "./Board.scss";
import { useState } from "react";
import { Move, TicTacToe, TicTacToeAnalysis } from "./lib/ticTacToe";
import Tile from "./Tile";

function Board() {
  const ticTacToe = new TicTacToe();

  const [analysis, setAnalysis] = useState(getInitAnalysis());

  function onStartClick(): void {
    setAnalysis(getInitAnalysis());
  }

  function getInitAnalysis(): TicTacToeAnalysis {
    const analysis = new TicTacToeAnalysis();
    analysis.board[getRand(0, 2)][getRand(0, 2)] = Move.X;

    return analysis;
  }

  function getRand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function onTileClick(row: number, col: number): void {
    analysis.board[row][col] = Move.O;

    const currAnalysis = ticTacToe.play(analysis.board);
    if (currAnalysis) {
      setAnalysis(currAnalysis);
    }
  }

  function TicTacToeBoard(): JSX.Element {
    const tiles = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        tiles.push(
          <div
            onClick={() => onTileClick(row, col)}
            className="tile-wrapper"
            key={`${row},${col}`}
          >
            <Tile move={analysis.board[row][col]} status={analysis.status} />
          </div>
        );
      }
    }

    return <div className="board">{tiles}</div>;
  }

  return (
    <>
      <button onClick={onStartClick}>Start</button>
      <TicTacToeBoard />
    </>
  );
}

export default Board;
