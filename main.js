const puzzleList = document.querySelector("#puzzle-table tbody");

fetch("puzzle.json")
  .then((res) => res.json())
  .then((puzzleDB) => {
    let puzzleListEl = "";
    puzzleDB.forEach((data) => {
      puzzleListEl += `<tr>
        <td class="id">${data.id}</td>
        <td class="status">${data.status}</td>
        <td class="title"><a href="#">${data.title}</a></td>
        <td class="size">${data.size}</td>
        <td class="finished-count">${data.finishedCount}</td>
        <td class="recommendation">${data.recommendation}</td>
        <td class="avg-time">${data.avgTime}</td>
    </tr>`;
      puzzleList.innerHTML = puzzleListEl;
    });
  });
