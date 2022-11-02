import "./Board.scss";
import { useState, useEffect } from "react";
import { MoveStatus, TicTacToe, TicTacToeAnalysis } from "./lib/ticTacToe";
import Tile from "./Tile";

function Board(props: { analysis: TicTacToeAnalysis }) {
  const [analysis, setAnalysis] = useState(props.analysis);

  useEffect(() => {
    setAnalysis(props.analysis);
  }, [props.analysis]);

  function onTileClick(row: number, col: number): void {
    let currAnalysis = analysis.moves[row][col];
    if (currAnalysis) {
      if (currAnalysis.status === MoveStatus.Undefined) {
        currAnalysis = TicTacToe.getBestMove(currAnalysis) as TicTacToeAnalysis;
      }

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

  return <TicTacToeBoard />;
}

export default Board;
