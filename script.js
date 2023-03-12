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
  yTaskBox.setAttribute("class", `y${x} task-box`);
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

      //토글로 cell 배열 변경
      cells.map((cell) =>
        cell.x === thisX && cell.y === thisY ? (cell.is = !cell.is) : null
      );
      //토글로 클래스 변경(셀 채우기)
      e.target.classList.toggle("true");
      puzzleSetting(thisX, thisY);
    });
  }
}

// 문제 세팅

function puzzleSetting(x, y) {
  const xCells = cells.filter((cell) => cell.x === x);

  let xTasks = [];
  let xTaskCount = 0;

  const yCells = cells.filter((cell) => cell.y === y);
  let yTasks = [];
  let yTaskCount = 0;

  //클릭한 x,y축의 배열을 순회해서 is값 확인하기
  for (let i = 0; i < boardSize; i++) {
    //is값이 true면 1을 더하기, 마지막 배열에서는 task배열에 넣기
    if (xCells[i].is === true) {
      xTaskCount += 1;
      i === boardSize - 1 ? xTasks.push(xTaskCount) : null;
    } else {
      //is 값이 false이고, 카운팅 된 숫자가 0이상이면 배열에 넣기
      xTaskCount && xTasks.push(xTaskCount);
      xTaskCount = 0;
    }

    //is값이 true면 1을 더하기, 마지막 배열에서는 task배열에 넣기
    if (yCells[i].is === true) {
      yTaskCount += 1;
      i === boardSize - 1 ? yTasks.push(yTaskCount) : null;
    } else {
      //is 값이 false면 카운팅 된 숫자가 0이상이면 배열에 넣기
      yTaskCount && yTasks.push(yTaskCount);
      yTaskCount = 0;
    }
  }

  //클래스 명이 x[x]인 xTaskBoxEl 찾기
  const xTaskBoxEl = document.querySelector(`#x-tasks .x${x}`);

  xTaskBoxEl.innerHTML = xTasks.map((count) => `<p>${count}</p>`).join("");

  //클래스 명이 y[y]인 yTaskBoxEl 찾기
  const yTaskBoxEl = document.querySelector(`#y-tasks .y${y}`);

  yTaskBoxEl.innerHTML = yTasks.map((count) => `<p>${count}</p>`).join("");
}

// //문제 그리기

// function paintTaskCount(x, y, xTasks, yTasks) {

// }

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

// setBtn.addEventListener("click", puzzleSetting);
