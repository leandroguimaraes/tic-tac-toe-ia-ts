export enum Move {
  X,
  O,
  null,
}

export enum MoveStatus {
  Undefined,
  Win,
  Loss,
  Draw,
}

export class TicTacToeAnalysis {
  public board: Move[][] = new Array(3)
    .fill(Move.null)
    .map(() => new Array(3).fill(Move.null));
  public status: MoveStatus = MoveStatus.Undefined;
  public moves: TicTacToeAnalysis[][] = new Array(3)
    .fill(null)
    .map(() => new Array(3).fill(null));
  public winDistance = 0;
  public lossDistance = 0;
  public nWins = 0;
  public nLosses = 0;
  public nDraws = 0;
}

export class TicTacToe {
  private memory = new Map<string, TicTacToeAnalysis>();

  constructor() {
    this.calcSolutionTree(new TicTacToeAnalysis(), Move.O);
  }

  public play(board?: Move[][]): TicTacToeAnalysis | undefined {
    if (!board) {
      const analysis = new TicTacToeAnalysis();
      board = analysis.board;
    }

    const analysis = this.memory.get(this.boardToString(board));
    if (!analysis) {
      throw new Error("Impossible move");
    }

    return this.getBestMove(analysis as TicTacToeAnalysis);
  }

  private getBestMove(
    analysis: TicTacToeAnalysis
  ): TicTacToeAnalysis | undefined {
    let bestMoveVal;
    let bestMove;

    // search for a winner move
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (analysis.moves[row][col]?.winDistance === 1) {
          return analysis.moves[row][col];
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (analysis.moves[row][col]) {
          // if there is a loss move
          if (analysis.moves[row][col].lossDistance === 2) {
            for (let rowNotLose = 0; rowNotLose < 3; rowNotLose++) {
              for (let colNotLose = 0; colNotLose < 3; colNotLose++) {
                // search for the move that avoid the imediate loss
                if (analysis.moves[rowNotLose][colNotLose]?.lossDistance > 2)
                  return analysis.moves[rowNotLose][colNotLose];
              }
            }
          } else if (!bestMoveVal) {
            bestMove = analysis.moves[row][col];
            bestMoveVal = this.calcVal(bestMove);
          } else {
            const checkVal = this.calcVal(analysis.moves[row][col]);
            if (checkVal > bestMoveVal) {
              bestMove = analysis.moves[row][col];
              bestMoveVal = checkVal;
            }
          }
        }
      }
    }

    return bestMove;
  }

  private calcVal(analysis: TicTacToeAnalysis): number {
    return analysis.nWins - analysis.nDraws - analysis.nLosses;
  }

  private boardToString(board: Move[][]): string {
    const result = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        result.push(board[row][col]);
      }
    }

    return result.join(",");
  }

  public printTicTacToe(ticTacToe: Move[][]): void {
    for (let row = 0; row < 3; row++) {
      const values = [];
      for (let col = 0; col < 3; col++) {
        values.push(
          ticTacToe[row][col] !== Move.null ? Move[ticTacToe[row][col]] : " "
        );
      }

      console.log(values.join(" | "));
      if (row < 2) {
        console.log("-------------");
      }
    }
  }

  public debug(currMoves: TicTacToeAnalysis): void {
    const checkValues = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const check = currMoves.moves[row][col];
        if (check) {
          checkValues.push(
            `${check.winDistance}:${check.lossDistance}:${this.calcVal(check)}`
          );
        } else {
          checkValues.push("---------");
        }
      }
    }
    console.log(checkValues.slice(0, 3).join(","));
    console.log(checkValues.slice(3, 6).join(","));
    console.log(checkValues.slice(6, 9).join(","));
  }

  private calcSolutionTree(analysis: TicTacToeAnalysis, move: Move): void {
    const currMove = move === Move.O ? Move.X : Move.O;

    const winDistances = [];
    const lossDistances = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (analysis.board[row][col] === Move.null) {
          let moveAnalysis = new TicTacToeAnalysis();
          moveAnalysis.board = analysis.board.map((arr) => arr.slice());
          moveAnalysis.board[row][col] = currMove;

          const hash = this.boardToString(moveAnalysis.board);
          if (!this.memory.has(hash)) {
            moveAnalysis.status = this.calcStatus(moveAnalysis.board, Move.X);
            if (moveAnalysis.status === MoveStatus.Undefined) {
              this.calcSolutionTree(moveAnalysis, currMove);
            } else if (moveAnalysis.status === MoveStatus.Win) {
              moveAnalysis.nWins++;
              moveAnalysis.winDistance = 1;
            } else if (moveAnalysis.status === MoveStatus.Loss) {
              moveAnalysis.nLosses++;
              moveAnalysis.lossDistance = 1;
            } else if (moveAnalysis.status === MoveStatus.Draw) {
              moveAnalysis.nDraws++;
            }
          } else {
            moveAnalysis = this.memory.get(hash) as TicTacToeAnalysis;
          }

          analysis.nWins += moveAnalysis.nWins;
          analysis.nLosses += moveAnalysis.nLosses;
          analysis.nDraws += moveAnalysis.nDraws;

          analysis.moves[row][col] = moveAnalysis;

          if (moveAnalysis.winDistance)
            winDistances.push(moveAnalysis.winDistance);

          if (moveAnalysis.lossDistance)
            lossDistances.push(moveAnalysis.lossDistance);

          this.memory.set(hash, moveAnalysis);
        }
      }
    }

    if (winDistances.length) analysis.winDistance = winDistances.sort()[0] + 1;
    if (lossDistances.length)
      analysis.lossDistance = lossDistances.sort()[0] + 1;
  }

  private calcStatus(board: Move[][], me: Move): MoveStatus {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== Move.null &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0] === me ? MoveStatus.Win : MoveStatus.Loss;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== Move.null &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i] === me ? MoveStatus.Win : MoveStatus.Loss;
      }
    }

    if (
      board[0][0] !== Move.null &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0] === me ? MoveStatus.Win : MoveStatus.Loss;
    }

    if (
      board[0][2] !== Move.null &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2] === me ? MoveStatus.Win : MoveStatus.Loss;
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === Move.null) {
          return MoveStatus.Undefined;
        }
      }
    }

    return MoveStatus.Draw;
  }
}
