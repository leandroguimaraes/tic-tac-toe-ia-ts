import { Move, MoveStatus } from "./lib/ticTacToe";
import "./Tile.scss";

function Tile(props: { move: Move; status: MoveStatus }) {
  return (
    <div
      className={`tile ${
        props.status === MoveStatus.Win
          ? "win"
          : props.status === MoveStatus.Loss
          ? "loss"
          : props.status === MoveStatus.Draw
          ? "draw"
          : ""
      } ${props.move === Move.null ? "empty" : ""}`}
    >
      <span className="material-symbols-outlined">
        {props.move === Move.X
          ? "close"
          : props.move === Move.O
          ? "radio_button_unchecked"
          : ""}
      </span>
    </div>
  );
}

export default Tile;
