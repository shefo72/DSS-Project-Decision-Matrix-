let optionsNum = 0;
let criteriaNum = 0;

function generateTable() {
  optionsNum = parseInt(document.getElementById("numOfOptions").value);
  criteriaNum = parseInt(document.getElementById("numOfCriteria").value);
  const container = document.getElementById("TableContainer");
  const mainContainer = document.getElementById("card");

  if (mainContainer) mainContainer.remove();

  const table = document.createElement("div");
  table.classList.add("tableCard", "card");

  // Build HTML
  let tableHTML =
    '<div class="thead"><img src="./decision-making.png" class="side-img" alt="matrix" /> <h3 class="card-title text-center">Decision Matrix Table</h3></div>';
  tableHTML += '<table class="table table-bordered">';

  // Criteria header
  tableHTML += "<thead><tr><th>Option / Criteria</th>";
  for (let c = 1; c <= criteriaNum; c++) {
    tableHTML += `
    <th>
      <input type="text" class="form-control fw-bold weight-input" placeholder="Criteria Num ${c}">
    </th>`;
  }
  tableHTML += `<th class='text-center fw-bold'>TOTAL</th>`;
  tableHTML += "</tr></thead><tbody>";

  // Weights row
  tableHTML += '<tr><td class="fw-bold">Weights</td>';
  for (let c = 1; c <= criteriaNum; c++) {
    tableHTML += `
    <td>
      <input id="w${c}" type="number" class="form-control weight-input">
    </td>`;
  }
  tableHTML += `<th></th></tr>`;

  // Options rows
  for (let o = 1; o <= optionsNum; o++) {
    tableHTML += `<tr><td class="fw-bold"><input id="option${o}" type="text" class="form-control fw-bold weight-input" placeholder="Option Num ${o}"></td>`;
    for (let c = 1; c <= criteriaNum; c++) {
      tableHTML += `<td><input id="o${o}c${c}" type="number" class="form-control score-input"></td>`;
    }
    tableHTML += `<th id="v${o}"></th></tr>`;
  }

  tableHTML += "</tbody></table>";

  // Result div
  tableHTML += `<div id="result" class="mt-3"></div>`;

  tableHTML += `
    <div class="d-flex justify-content-end">
      <button onclick="calc()" id="calcBtn" class="calc-btn">Calc</button>
    </div>
  `;

  table.innerHTML = tableHTML;
  container.append(table);
}

function calc() {
  let total = [];
  let weights = [];
  let optionsName = [];

  // Option Names
  for (let i = 1; i <= optionsNum; i++) {
    const el = document.getElementById(`option${i}`);
    optionsName.push(el.value.trim() !== "" ? el.value.trim() : `Num${i}`);
  }

  // Create option arrays
  const options = createArraysForOpthions(optionsNum);

  // Scores
  for (let o = 1; o <= optionsNum; o++) {
    for (let c = 1; c <= criteriaNum; c++) {
      let value = parseInt(document.getElementById(`o${o}c${c}`).value);
      if (isNaN(value) || value < 0) {
        handleError();
        return;
      }
      options[`op${o}`].push(value);
    }
  }

  // Weights
  for (let i = 0; i < criteriaNum; i++) {
    let WeightsValue = parseInt(document.getElementById(`w${i + 1}`).value);
    if (isNaN(WeightsValue) || WeightsValue < 0) {
      handleError();
      return;
    }
    weights[i] = WeightsValue;
  }

  // Calculate totals
  for (let o = 1; o <= optionsNum; o++) {
    let sum = 0;
    for (let c = 0; c < criteriaNum; c++) {
      sum += options[`op${o}`][c] * weights[c];
    }
    total.push(sum);
  }

  // Display totals
  for (let o = 1; o <= optionsNum; o++) {
    document.getElementById(`v${o}`).innerHTML = total[o - 1];
  }

  // Disable calc button
  document.getElementById("calcBtn").disabled = true;

  // Best option
  const bestIndexes = CheckBestOption(total);
  const bestOptions = bestIndexes.map((i) => optionsName[i]).join(" and ");

  document.getElementById("result").innerHTML = `
      <p class="alert text-center fs-4 fw-bold">
      <i class="fa-solid fa-cubes me-2"></i> Best Option : ${bestOptions}
      </p>`;

  highlightBestRows(bestIndexes);

  afterCalc();
}

function createArraysForOpthions(num) {
  const all = {};
  for (let i = 0; i < num; i++) {
    all[`op${i + 1}`] = [];
  }
  return all;
}

function CheckBestOption(arr) {
  const bestValue = Math.max(...arr);
  const indexes = [];
  arr.forEach((val, idx) => {
    if (val === bestValue) indexes.push(idx);
  });
  return indexes;
}

function highlightBestRows(bestIndexes) {
  const rows = document.querySelectorAll("tbody tr");
  bestIndexes.forEach((i) => {
    rows[i + 1].classList.add("table-success");
  });
}

function afterCalc() {
  const reloadbtn = `
    <button id="reloadBtn" class="btn btn-warning btn-lg shadow-sm mt-4">
      <i class="fa-solid fa-rotate-right me-2"></i> Reload Page
    </button>`;

  document.getElementById("reload").innerHTML = reloadbtn;

  document.getElementById("reloadBtn").addEventListener("click", () => {
    window.location.reload();
  });
}

function handleError() {
  Swal.fire({
    icon: "error",
    title: "Missing Data",
    text: "Please fill all scores and weights before calculating.",
  });
}
