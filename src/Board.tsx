import "./Board.scss";
import { useState, useEffect } from "react";
import { MoveStatus, TicTacToe, TicTacToeAnalysis } from "./lib/ticTacToe";
import Tile from "./Tile";

function Board(props: any) {
  let analysis: TicTacToeAnalysis = props.analysis;
  const [tiles, setTiles] = useState(setBoard(analysis));

  useEffect(() => {
    setTiles(setBoard(props.analysis));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.analysis]);

  function onTileClick(row: number, col: number): void {
    if (analysis.moves[row][col]) {
      analysis = analysis.moves[row][col];
      if (analysis.status === MoveStatus.Undefined) {
        analysis = TicTacToe.getBestMove(analysis) as TicTacToeAnalysis;
      }

      setTiles(setBoard(analysis));
    }
  }

  function setBoard(analysis: TicTacToeAnalysis): any[] {
    const newTiles = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        newTiles.push(
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

    return newTiles;
  }

  return <div className="board">{tiles}</div>;
}

export default Board;
