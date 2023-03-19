const gameBoard = document.getElementById("board");

const rows = 5;
createTaskBox("row", rows);
const cols = 5;
createTaskBox("col", cols);
let cells = [];

for (let i = 1; i <= rows; i++) {
  //로우 만들기
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "row");
  gameBoard.appendChild(divEl);

  for (let j = 1; j <= cols; j++) {
    cells.push({ row: i, col: j, is: false });

    const cell = document.createElement("div");
    cell.setAttribute("class", `cell`);
    cell.setAttribute("data-row", `${i}`);
    cell.setAttribute("data-col", `${j}`);

    divEl.appendChild(cell);

    cell.addEventListener("click", (e) => {
      //클릭한 셀의 좌표
      const thisRow = parseInt(e.target.getAttribute("data-row"));
      const thisCol = parseInt(e.target.getAttribute("data-col"));

      //토글로 cell 배열 변경
      cells.map((cell) =>
        cell.row === thisRow && cell.col === thisCol
          ? (cell.is = !cell.is)
          : null
      );
      //토글로 클래스 변경(셀 채우기)
      e.target.classList.toggle("true");
      puzzleSetting(thisRow, thisCol);
    });
  }
}

function createTaskBox(matrix, cells) {
  const taskContainerEl = document.getElementById(`${matrix}-clue`);
  for (let i = 1; i <= cells; i++) {
    const taskBoxEl = document.createElement("div");
    taskBoxEl.setAttribute("class", `${matrix}${i} clue-container`);
    taskContainerEl.appendChild(taskBoxEl);
  }
}

function countTasks(cells) {
  let tasks = [];
  let taskCount = 0;

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].is === true) {
      taskCount += 1;
      i === cells.length - 1 ? tasks.push(taskCount) : null;
    } else {
      taskCount && tasks.push(taskCount);
      taskCount = 0;
    }
  }

  return tasks;
}

function puzzleSetting(row, col) {
  const rowCells = cells.filter((cell) => cell.row === row);
  const colCells = cells.filter((cell) => cell.col === col);

  const rowTasks = countTasks(rowCells);
  const colTasks = countTasks(colCells);

  const rowTaskBoxEl = document.querySelector(`#row-tasks .row${row}`);
  rowTaskBoxEl.innerHTML = rowTasks.map((count) => `<p>${count}</p>`).join("");

  const colTaskBoxEl = document.querySelector(`#col-tasks .col${col}`);
  colTaskBoxEl.innerHTML = colTasks.map((count) => `<p>${count}</p>`).join("");
}
