let optionsNum = 0;
let criteriaNum = 0;

function generateTable() {
  const numOptions = parseInt(document.getElementById("numOfOptions").value);
  const numCriteria = parseInt(document.getElementById("numOfCriteria").value);
  optionsNum = numOptions;
  criteriaNum = numCriteria;
  const container = document.getElementById("TableContainer");
  const mainContainer = document.getElementById("card");

  mainContainer.remove();
  container.innerHTML = "";
  const table = document.createElement("div");
  table.classList.add("tableCard", "card");

  // table
  let tableHTML =
    '<div class="thead"><img src="./decision-making.png" class="side-img" alt="matrix" /> <h3 class="card-title text-center">Decision Matrix Table</h3></div>';
  tableHTML += '<table class="table table-bordered">';

  // Criteria
  tableHTML += "<thead><tr><th>Option / Criteria</th>";
  for (let c = 1; c <= numCriteria; c++) {
    tableHTML += `<th><input   type="text" class="form-control fw-bold weight-input" placeholder="Criteria Num ${c}"></th>`;
  }
  // total colum
  tableHTML += `<th class='text-center fw-bold '>TOTAL</th>`;
  tableHTML += "</tr></thead>";
  tableHTML += "<tbody>";

  // Weights
  tableHTML += '<tr><td class="fw-bold">Weights</td>';
  for (let c = 1; c <= numCriteria; c++) {
    tableHTML += `<td><input  id="w${c}" type="number"  class="form-control weight-input"></td>`;
  }
  tableHTML += `<th></th>`;
  tableHTML += "</tr>";

  // Options
  for (let o = 1; o <= numOptions; o++) {
    tableHTML += `<tr><td class="fw-bold"><input id="option${o}" type="text" class="form-control fw-bold weight-input" placeholder="Option Num ${o}"></td>`;
    for (let c = 1; c <= numCriteria; c++) {
      tableHTML += `<td><input  id="o${o}c${c}" type="number" class="form-control score-input"></td>`;
    }
    tableHTML += `<th id="v${o}"></th>`;
    tableHTML += "</tr>";
  }

  tableHTML += "</tbody></table>";

  tableHTML += `<div id="result" class="mt-3"></div>`;

  // btn with action method
  tableHTML += `<div class="d-flex justify-content-end">
    <button onclick="calc()" id='calcBtn'  class="calc-btn">
      Calc
    </button> </div>`;

  table.innerHTML = tableHTML;
  container.append(table);
}

function calc() {
  const numOptions = optionsNum;
  const numCriteria = criteriaNum;

  let total = [];
  let weights = [];
  let optionsName = [];

  // get options name
  for (let i = 1; i <= numOptions; i++) {
    const el = document.getElementById(`option${i}`);
    if (el.value !== "") {
      optionsName.push(el.value);
    } else {
      optionsName.push(`Num${i}`);
    }
  }
  console.log(optionsName);

  const options = createArraysForOpthions(numOptions);

  // get scores
  for (let o = 1; o <= numOptions; o++) {
    for (let c = 1; c <= numCriteria; c++) {
      let value = parseInt(document.getElementById(`o${o}c${c}`).value);
      options[`op${o}`].push(value);
    }
  }

  // get weights
  for (let i = 0; i < numCriteria; i++) {
    weights[i] = parseInt(document.getElementById(`w${i + 1}`).value);
  }

  // calc value
  for (let o = 1; o <= numOptions; o++) {
    let sum = 0;
    for (let c = 0; c < numCriteria; c++) {
      sum += options[`op${o}`][c] * weights[c];
    }
    total.push(sum);
  }

  // display value
  for (let o = 1; o <= numOptions; o++) {
    document.getElementById(`v${o}`).innerHTML = total[o - 1];
  }
  document.getElementById("calcBtn").remove();
  const best = CheckBestOptino(total);
  document.getElementById("result").innerHTML = `
  <p class="alert  text-center fs-4 fw-bold">
  <i class="fa-solid fa-cubes me-2"></i> Best Option : ${optionsName[best]}
</p>`;
  afterCalc();
}

// array for [num] options
function createArraysForOpthions(num) {
  const all = {};
  for (let i = 0; i < num; i++) {
    all[`op${i + 1}`] = [];
  }
  return all;
}

function CheckBestOptino(arr) {
  const bestValue = Math.max(...arr);
  const index = arr.indexOf(bestValue);
  return index;
}

function afterCalc() {
  const reloadbtn = `
    <button id="reloadBtn" class="btn btn-warning btn-lg shadow-sm mt-4">
      <i class="fa-solid fa-rotate-right me-2"></i> Reload Page
    </button>
`;
  document.getElementById("reload").innerHTML = reloadbtn;
  document.getElementById("reloadBtn").addEventListener("click", function () {
    window.location.reload();
  });
}
