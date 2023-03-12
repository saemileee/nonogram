const gameBoard = document.getElementById("board");
const xTaskContainerEl = document.getElementById("x-tasks");
const yTaskContainerEl = document.getElementById("y-tasks");

let boardSize = 10;
let cells = [];

for (let x = 1; x <= boardSize; x++) {
  const xTaskBoxEl = document.createElement("tr");
  xTaskBoxEl.setAttribute("class", `x${x} task-box`);
  xTaskContainerEl.appendChild(xTaskBoxEl);

  const yTaskBox = document.createElement("tr");
  yTaskBox.setAttribute("class", `x${x} task-box`);
  yTaskContainerEl.appendChild(yTaskBox);

  //로우 만들기
  const trEl = document.createElement("tr");
  gameBoard.appendChild(trEl);

  for (let y = 1; y <= boardSize; y++) {
    cells.push({ x: x, y: y, is: false });

    const cell = document.createElement("td");
    cell.setAttribute("class", `cell`);
    cell.setAttribute("data-x", `${x}`);
    cell.setAttribute("data-y", `${y}`);

    trEl.appendChild(cell);

    cell.addEventListener("click", (e) => {
      //클릭한 셀의 좌표
      const thisX = parseInt(e.target.getAttribute("data-x"));
      const thisY = parseInt(e.target.getAttribute("data-y"));
    });
  }
}

// 문제 세팅

// function puzzleSetting() {
//   for (let i = 0; i < boardSize; i++) {
//     //x 문제들 나열
//     const _x = cells.filter((cell) => cell.coordinate[0] === i);
//     let tasks = [];
//     let taskCount = 0;
//     for (let j = 1; j <= _x.length; j++) {
//       if (_x[j].is === true) {
//         taskCount += 1;
//         j === _x.length - 1 ? tasks.push(taskCount) : null;
//       } else if (_x[j].is === false) {
//         taskCount !== 0 ? tasks.push(taskCount) : null;
//         taskCount = 0;
//       }
//       console.log(tasks);
//     }

//     const _xTaskBox = document.querySelector(`.x${i}`);
//     for (const i of tasks) {
//       const taskDiv = document.createElement("tr");
//       taskDiv.innerHTML = i;
//       taskDiv.setAttribute("class", "task");
//       _xTaskBox.appendChild(taskDiv);
//     }
//   }
// }

//set btn
const setBtn = document.getElementById("set-btn");

// setBtn.addEventListener("click", puzzleSetting);
