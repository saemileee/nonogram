const gameBoard = document.getElementById("game");
const cell = document.createElement("div");
gameBoard.appendChild(cell);

let cells = [{ coordinate: [0, 0], is: false }];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    cells.push({ coordinate: [i, j], is: false });
  }
}

console.log(2);
