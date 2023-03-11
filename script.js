const gameBoard = document.getElementById("all-cells");
const xTasks = document.getElementById("x-tasks");
const yTasks = document.getElementById("y-tasks");

let boardSize = 10;
let cells = [];
for (let x = 0; x < boardSize; x++) {
  const xTaskBox = document.createElement("div");
  xTaskBox.setAttribute("class", `x${x} task-box`);
  xTasks.appendChild(xTaskBox);

  const yTaskBox = document.createElement("div");
  yTaskBox.setAttribute("class", `x${x} task-box`);
  yTasks.appendChild(yTaskBox);

  for (let y = 0; y < boardSize; y++) {
    cells.push({ coordinate: [x, y], is: false });
    const cell = document.createElement("div");
    cell.setAttribute("class", `cell ${cells[y].is}`);
    cell.setAttribute("data-x", `${x}`);
    cell.setAttribute("data-y", `${y}`);
    gameBoard.appendChild(cell);
    cell.addEventListener("click", (e) => {
      //클릭한 셀의 좌표
      const thisX = parseInt(e.target.getAttribute("data-x"));
      const thisY = parseInt(e.target.getAttribute("data-y"));

      //클릭 시 셀 채우기
      if (e.target.classList.contains("false")) {
        cells.map((cell) => {
          if (cell.coordinate[0] === thisX && cell.coordinate[1] === thisY) {
            cell.is = true;
          }
        });
        cell.setAttribute("class", `cell ${cells[y].is}`);
      } else {
        // 채워진 셀 클릭 시 셀 지우기
        cells.map((cell) => {
          if (cell.coordinate[0] === thisX && cell.coordinate[1] === thisY) {
            cell.is = false;
          }
        });
        cell.setAttribute("class", `cell ${cells[y].is}`);
      }
    });
  }
}

// 문제 세팅

function puzzleSetting() {
  const x0 = cells.filter((cell) => cell.coordinate[0] === 0);
  let tasks = [];
  let taskCount = 0;
  for (let i = 0; i < x0.length; i++) {
    if (x0[i].is === true) {
      taskCount += 1;
      if (i === x0.length - 1) {
        tasks.push(taskCount);
      }
    } else if (x0[i].is === false) {
      taskCount !== 0 ? tasks.push(taskCount) : null;
      taskCount = 0;
    }
  }
  console.log(x0);

  const _xTaskBox = document.querySelector(".x0");
  for (const i of tasks) {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = i;
    console.log(_xTaskBox);
    _xTaskBox.appendChild(taskDiv);
  }
}

//set btn
const setBtn = document.getElementById("set-btn");

setBtn.addEventListener("click", puzzleSetting);
