import "./App.scss";
import { useState } from "react";
import Board from "./Board";
import { TicTacToe } from "./lib/ticTacToe";

const analysis = TicTacToe.getSolutionTree();

function App() {
  const [currAnalysis, setAnalysis] = useState(
    analysis.moves[getRand(0, 2)][getRand(0, 2)]
  );

  function onStartClick(): void {
    setAnalysis(analysis.moves[getRand(0, 2)][getRand(0, 2)]);
  }

  function getRand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="wrapper">
      <h1>Tic Tac Toe</h1>
      <button onClick={onStartClick}>Start</button>
      <Board analysis={currAnalysis} />
    </div>
  );
}

export default App;
