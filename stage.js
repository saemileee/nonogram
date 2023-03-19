const gameBoard = document.getElementById("board");

const answerArr = [
  [true, true, true, true, true],
  [true, false, false, false, false],
  [true, false, false, false, false],
  [true, false, false, true, false],
  [true, false, false, false, false],
];

const ROWS = answerArr.length;
const COLS = answerArr[0].length;
let cells = [];

//2차원 배열 만들기
for (let i = 0; i < ROWS; i++) {
  cells.push([]);

  //로우 el생성
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  gameBoard.appendChild(row);

  for (let j = 0; j < COLS; j++) {
    cells[i].push(false);
    //셀 el생성
    const cell = document.createElement("div");
    cell.setAttribute("data-row", `${i}`);
    cell.setAttribute("data-col", `${j}`);
    row.appendChild(cell);

    cell.addEventListener("click", checkCellArr);
    cell.addEventListener("contextmenu", checkBlockArr);

    //5칸마다 굵은 border
    if (j % 5 === 0) {
      cell.style.borderLeftWidth = "1.5px";
      cell.style.borderLeftColor = "black";
    }
    if (i % 5 === 0) {
      cell.style.borderTopWidth = "1.5px";
      cell.style.borderTopColor = "black";
    }
  }
}

//클릭 시 셀배열 체크
function checkCellArr(e) {
  //클릭한 셀의 위치 값 찾기
  const thisRow = parseInt(e.target.getAttribute("data-row"));
  const thisCol = parseInt(e.target.getAttribute("data-col"));

  //클릭한 셀의 배열을 토글로 변경
  cells[thisRow][thisCol] = !cells[thisRow][thisCol];
  paintCell(thisRow, thisCol, e);
}

//우클릭 시 셀배열 블락 체크
function checkBlockArr(e) {
  e.preventDefault();
  //클릭한 셀의 위치 값 찾기
  const thisRow = parseInt(e.target.getAttribute("data-row"));
  const thisCol = parseInt(e.target.getAttribute("data-col"));

  //클릭한 셀의 배열을 블락으로 변경
  cells[thisRow][thisCol] !== "block"
    ? (cells[thisRow][thisCol] = "block")
    : (cells[thisRow][thisCol] = false);
  paintCell(thisRow, thisCol, e);
}

//배열을 바탕으로 셀 요소 채우기
function paintCell(row, col, e) {
  const cellStatus = cells[row][col];
  if (cellStatus === false) {
    e.target.removeAttribute("class");
  } else if (cellStatus === true) {
    e.target.setAttribute("class", "true");
  } else if (cellStatus === "block") {
    e.target.setAttribute("class", "block");
  }
}

//힌트 컨테이너 만들기
const rowClue = createClue("row", ROWS);
const colClue = createClue("col", COLS);

function createClue(matrixName, matrix) {
  const clue = document.getElementById(`${matrixName}-clue`);
  for (let i = 0; i < matrix; i++) {
    const clueContainer = document.createElement("div");
    clueContainer.setAttribute("class", `${matrixName}${i} clue-container`);
    clue.appendChild(clueContainer);
    //5칸마다 굵은 border
    if (i % 5 === 0 && matrixName === "row") {
      clueContainer.style.borderTopWidth = "1.5px";
    } else if (i % 5 === 0 && matrixName === "col") {
      clueContainer.style.borderLeftWidth = "1.5px";
    }
  }
  return clue;
}

//페인트 된 셀 카운트하기
function countTasks(matrixName, size, thisCell) {
  let clueArr = [];
  let taskCount = 0;

  //셀 순회
  for (let i = 0; i < size; i++) {
    //셀 순회 중 현재 셀이 true인 경우 카운트가 1씩 증가, true가 아니라면 지금까지 카운트 된 셀은 clueArr에 담고 카운트 초기화, 마지막 인덱스의 셀이라면 현재 셀이 true이더라도 clueArr에 추가
    if (matrixName === "row" && answerArr[thisCell][i] === true) {
      taskCount += 1;
      if (i === size - 1) {
        clueArr.push(taskCount);
      }
    } else if (matrixName === "col" && answerArr[i][thisCell] === true) {
      taskCount += 1;
      if (i === size - 1) {
        clueArr.push(taskCount);
      }
    } else {
      taskCount && clueArr.push(taskCount);
      taskCount = 0;
    }
  }

  return clueArr;
}

//clue 세팅
function clueSetting() {
  for (let i = 0; i < ROWS; i++) {
    const rowClueArr = countTasks("row", COLS, i);
    //clue콘테이너 만들고 clueArr 받아서 페인팅하기
    const rowClueContainer = document.querySelector(`#row-clue .row${i}`);
    rowClueContainer.innerHTML = rowClueArr
      .map((count) => `<p>${count}</p>`)
      .join("");
  }

  for (let i = 0; i < COLS; i++) {
    const colClueArr = countTasks("col", ROWS, i);
    //clue콘테이너 만들고 clueArr 받아서 페인팅하기
    const colClueContainer = document.querySelector(`#col-clue .col${i}`);
    colClueContainer.innerHTML = colClueArr
      .map((count) => `<p>${count}</p>`)
      .join("");
  }
}

clueSetting();

//답안 제출

function submitAnswer(e) {
  let incorrectCounter = 0;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (cells[i][j] === "block") {
        cells[i][j] = false;
      }
      cells[i][j] !== answerArr[i][j] ? incorrectCounter++ : null;
    }
  }
  incorrectCounter === 0 ? alert("ok") : alert("try again");
}

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", submitAnswer);
