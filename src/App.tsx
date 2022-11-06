import "./App.scss";
import Board from "./Board";
import { TicTacToe } from "./lib/ticTacToe";

function App() {
  return (
    <div className="wrapper">
      <h1>Tic Tac Toe</h1>
      <Board ticTacToe={new TicTacToe()} />
    </div>
  );
}

export default App;
