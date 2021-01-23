
function make2DArray(cols, rows) {
  x = new Array(cols);

  for (var i = 0; i < cols; i++) {
    x[i] = new Array(rows);
  }

  return x;
}

function countNeighbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

let grid;
let rows;
let cols;
let resolution = 8;
let fr=30;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = int(windowHeight / resolution);
  cols = int(windowWidth / resolution);
  grid = make2DArray(cols, rows);

  //slider = createSlider(5, 60, 30);
  //slider.position(10, 10);
  //slider.style('width', '80px');

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        rect(x, y, resolution, resolution);
      }
    }
  }

  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let neighbours = countNeighbours(grid, i, j);
      let state = grid[i][j];

      if (state == 0 && neighbours == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }

    }
  }

  grid = next;

  //let fr = slider.value();
  //frameRate(fr);
  //frameRate(20);

}