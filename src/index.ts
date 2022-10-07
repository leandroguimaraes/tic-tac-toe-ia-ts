import {MoveStatus, TicTacToe, TicTacToeAnalysis} from './ticTacToe';

function main(): void {
  console.time('Analysis');
  const analysis = TicTacToe.getSolutionTree();
  console.timeEnd('Analysis');

  const currMoves =
    analysis.moves[1][1].moves[0][2].moves[2][2].moves[0][0].moves[0][1]
      .moves[1][0].moves[2][1];

  debug(currMoves);
  console.log('');

  TicTacToe.printTicTacToe(currMoves.board);
  console.log('');

  console.log(`winDistance: ${currMoves.winDistance - 1}`);

  console.log(MoveStatus[currMoves.status]);
}

main();

function debug(currMoves: TicTacToeAnalysis): void {
  const checkValues = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const check = currMoves.moves[row][col];
      if (check) {
        checkValues.push(
          `${check.winDistance - 1}:${check.lossDistance - 1}:${
            check.nWins - check.nDraws - check.nLosses
          }`
        );
      } else {
        checkValues.push('---------');
      }
    }
  }
  console.log(checkValues.slice(0, 3).join(','));
  console.log(checkValues.slice(3, 6).join(','));
  console.log(checkValues.slice(6, 9).join(','));
}
