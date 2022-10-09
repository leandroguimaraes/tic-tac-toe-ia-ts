import { Move, MoveStatus } from "./lib/ticTacToe";
import "./Tile.scss";

function Tile(props: any) {
  const move: Move = props.move;
  const status: MoveStatus = props.status;

  return (
    <div
      className={`tile ${
        status === MoveStatus.Win
          ? "win"
          : status === MoveStatus.Loss
          ? "loss"
          : status === MoveStatus.Draw
          ? "draw"
          : ""
      } ${move === Move.null ? "empty" : ""}`}
    >
      <span className="material-symbols-outlined">
        {move === Move.X
          ? "close"
          : move === Move.O
          ? "radio_button_unchecked"
          : ""}
      </span>
    </div>
  );
}

export default Tile;
