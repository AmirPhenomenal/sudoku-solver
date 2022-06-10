//Creating 2D Array For Soduku
let sodukuTable = [];
let sodukuSize = 9;
for (let index = 0; index < sodukuSize; index++) {
  let insideArray = [];
  for (let insideIndex = 0; insideIndex < sodukuSize; insideIndex++) {
    insideArray.push([]);
  }
  sodukuTable.push(insideArray);
}
//Feeding Data
const feedData = () => {
  sodukuTable[0][3] = 2;
  sodukuTable[1][0] = 8;
  sodukuTable[1][2] = 9;
  sodukuTable[1][6] = 1;
  sodukuTable[2][1] = 2;
  sodukuTable[3][0] = 6;
  sodukuTable[3][2] = 3;
  sodukuTable[3][5] = 9;
  sodukuTable[4][1] = 7;
  sodukuTable[4][3] = 6;
  sodukuTable[4][7] = 5;
  sodukuTable[5][4] = 4;
  sodukuTable[5][6] = 9;
  sodukuTable[5][8] = 3;
  sodukuTable[6][1] = 4;
  sodukuTable[6][4] = 8;
  sodukuTable[6][7] = 3;
  sodukuTable[7][2] = 6;
  sodukuTable[7][3] = 9;
  sodukuTable[7][7] = 7;
  sodukuTable[8][1] = 9;
  sodukuTable[8][2] = 5;
  sodukuTable[8][5] = 1;
  sodukuTable[8][8] = 2;
};
const isInRow = (row, num) => {
  for (let index = 0; index < sodukuSize; index++) {
    if (sodukuTable[row][index] == num) return true;
  }
  return false;
};
const isInCol = (col, num) => {
  for (let index = 0; index < sodukuSize; index++) {
    if (sodukuTable[index][col] == num) return true;
  }
  return false;
};
const isInGrid = (grid, num) => {
  for (let index = 0; index < grid.length; index++) {
    if (typeof grid[index] != "number") continue;
    if (grid[index] == num) return true;
  }
  return false;
};
const isPossibleInGrid = (grid, num) => {
  for (let index = 0; index < grid.length; index++) {
    if (typeof grid[index] == "number") continue;
    if (grid[index].includes(num)) return true;
  }
  return false;
};
const isPossibleInArray = (arr, num) => {
  for (let index = 0; index < arr.length; index++) {
    if (typeof arr[index] == "number") continue;
    if (arr[index].includes(num)) return true;
  }
  return false;
};
const getGrid = (gridRow, gridCol, ignoreCell) => {
  let grid = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (
        ignoreCell &&
        ignoreCell.row == gridRow + row &&
        ignoreCell.col == gridCol + col
      )
        continue;
      grid.push(sodukuTable[gridRow + row][gridCol + col]);
    }
  }
  return grid;
};
const findPossibleNumbersInGrid = () => {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let currentGrid = getGrid(i, j);
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (typeof sodukuTable[i + row][j + col] == "number") continue;
          for (let index = 0; index <= 9; index++) {
            if (
              isInGrid(currentGrid, index) ||
              isInRow(i + row, index) ||
              isInCol(j + col, index)
            )
              continue;
            sodukuTable[i + row][j + col].push(index);
          }
        }
      }
    }
  }
};

const solveSingleCells = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof sodukuTable[i][j] == "number" || sodukuTable[i][j].length != 1)
        continue;
      sodukuTable[i][j] = sodukuTable[i][j][0];
      console.log(`Solved X : ${i} Y : ${j}  => ${sodukuTable[i][j]}`);
      removeFromPossibles(sodukuTable[i][j], i, j);
    }
  }
};

const removeFromPossibles = (number, row, col) => {
  //remove from row and cols
  for (let i = 0; i < sodukuTable.length; i++) {
    if (typeof sodukuTable[row][i] != "number") {
      if (sodukuTable[row][i].includes(number)) {
        const index = sodukuTable[row][i].indexOf(number);
        sodukuTable[row][i].splice(index, 1);
      }
    }
    if (typeof sodukuTable[i][col] != "number") {
      if (sodukuTable[i][col].includes(number)) {
        const index = sodukuTable[i][col].indexOf(number);
        sodukuTable[i][col].splice(index, 1);
      }
    }
  }
  //remove from grid
  col++;
  row++;
  while (col % 3 != 0) {
    col++;
  }
  while (row % 3 != 0) {
    row++;
  }
  for (let i = row - 1; i >= row - 3; i--) {
    for (let j = col - 1; j >= col - 3; j--) {
      if (typeof sodukuTable[i][j] == "number") continue;
      if (sodukuTable[i][j].includes(number)) {
        const index = sodukuTable[i][j].indexOf(number);
        sodukuTable[i][j].splice(index, 1);
      }
    }
  }
};

const solveEveryGrid = () => {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          let currentCell = sodukuTable[i + row][j + col];
          if (typeof currentCell == "number") continue;
          //   if (typeof sodukuTable[i][j] == "number") continue;
          const grid = getGrid(i, j, { row: i + row, col: j + col });
          for (let cellIndex = 0; cellIndex < currentCell.length; cellIndex++) {
            if (isPossibleInGrid(grid, currentCell[cellIndex]) == false) {
              sodukuTable[i + row][j + col] = currentCell[cellIndex];
              console.log(
                `Solved X : ${i + row} Y : ${j + col}  => ${
                  sodukuTable[i + row][j + col]
                }`
              );
              removeFromPossibles(currentCell[cellIndex], i + row, j + col);
              break;
            }
          }
        }
      }
    }
  }
};
const removeIndexFromArray = (arr, index) => {
  const returnArr = Array.from(arr);
  returnArr.splice(index, 1);
  return returnArr;
};
const solveRows = () => {
  for (let i = 0; i < sodukuTable.length; i++) {
    for (let j = 0; j < sodukuTable.length; j++) {
      if (typeof sodukuTable[j][i] == "number") continue;
      for (
        let cellIndex = 0;
        cellIndex < sodukuTable[j][i].length;
        cellIndex++
      ) {
        const row = removeIndexFromArray(sodukuTable[j], i);
        if (isPossibleInArray(row, sodukuTable[j][i][cellIndex]) == false) {
          sodukuTable[j][i] = sodukuTable[j][i][cellIndex];
          console.log(`Solved X : ${j} Y : ${i}  => ${sodukuTable[j][i]}`);
          removeFromPossibles(sodukuTable[j][i], j, i);
          break;
        }
      }
    }
  }
};
const solveCols = () => {
  for (let i = 0; i < sodukuTable.length; i++) {
    for (let j = 0; j < sodukuTable.length; j++) {
      if (typeof sodukuTable[i][j] == "number") continue;
      for (
        let cellIndex = 0;
        cellIndex < sodukuTable[i][j].length;
        cellIndex++
      ) {
        const row = removeIndexFromArray(sodukuTable[i], j);
        if (isPossibleInArray(row, sodukuTable[i][j][cellIndex]) == false) {
          sodukuTable[i][j] = sodukuTable[i][j][cellIndex];
          console.log(`Solved X : ${i} Y : ${j}  => ${sodukuTable[i][j]}`);
          removeFromPossibles(sodukuTable[i][j], i, j);
          break;
        }
      }
    }
  }
};
const isSudokuSolved = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (typeof sodukuTable[i][j] != "number") return false;
    }
  }

  return true;
};
//Creating HTML Elements
for (let index = 0; index < sodukuSize; index++) {
  for (let insideIndex = 0; insideIndex < sodukuSize; insideIndex++) {
    const currentElement = document.createElement("input");
    currentElement.classList.add("cells");
    if (index == 0) {
      currentElement.classList.add("topBorder");
    }
    if (index == 8) {
      currentElement.classList.add("botBorder");
    }
    if (insideIndex == 0) {
      currentElement.classList.add("leftBorder");
    }
    if (insideIndex == 8) {
      currentElement.classList.add("rightBorder");
    }
    if ((index + 1) % 3 == 0) {
      currentElement.classList.add("botBorder");
    }
    if ((insideIndex + 1) % 3 == 0) {
      currentElement.classList.add("rightBorder");
    }
    currentElement.dataset.x = index;
    currentElement.dataset.y = insideIndex;
    currentElement.oninput = function () {
      const x = currentElement.dataset.x;
      const y = currentElement.dataset.y;

      sodukuTable[x][y] =
        currentElement.value != "" ? parseInt(currentElement.value) : [];
    };
    document.body.appendChild(currentElement);
  }
  const br = document.createElement("br");
  document.body.appendChild(br);
}

const updateTable = () => {
  for (let index = 0; index < 9; index++) {
    for (let insideIndex = 0; insideIndex < 9; insideIndex++) {
      const element = document.querySelector(
        `[data-x="${index}"][data-y="${insideIndex}"]`
      );
      element.value = sodukuTable[index][insideIndex];
    }
  }
};
document.getElementById("solve").addEventListener("click", () => {
  showSoduku();

  findPossibleNumbersInGrid();
  showSoduku();

  while (!isSudokuSolved()) {
    solveEveryGrid();
    solveCols();
    solveRows();
    solveSingleCells();
    showSoduku();
  }

  showSoduku();
  updateTable();
});

feedData();
updateTable();
