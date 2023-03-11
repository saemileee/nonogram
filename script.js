const gameBoard = document.getElementById("game");
const xTasks = document.getElementById("x-tasks");
const yTasks = document.getElementById("y-tasks");

let boardSize = 10;
let cells = [];
for (let x = 0; x < boardSize; x++) {
  for (let y = 0; y < boardSize; y++) {
    cells.push({ coordinate: [x, y], is: false });
    const cell = document.createElement("div");
    cell.setAttribute("class", `cell ${cells[y].is}`);
    cell.setAttribute("data-x", `${x}`);
    cell.setAttribute("data-y", `${y}`);
    gameBoard.appendChild(cell);
    cell.addEventListener("click", (e) => {
      //클릭 시 셀 채우기
      if (e.target.classList.contains("false")) {
        cells.map((cell) => {
          cell.is = true;
        });
        cell.setAttribute("class", `cell ${cells[y].is}`);
      } else {
        // 채워진 셀 클릭 시 셀 지우기
        cells.map((cell) => {
          cell.is = false;
        });
        cell.setAttribute("class", `cell ${cells[y].is}`);
      }
    });
  }
}
