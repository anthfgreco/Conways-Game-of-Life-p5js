let grid;
let rows;
let cols;

param = {
  "resolution": 7,
  "boolean": true,
  "Reset Canvas" : function() {
    repeatSetup();
  }
}
bgColor = {
  r: 0,
  g: 0,
  b: 0
}
tileColor = {
  r: 255,
  g: 255,
  b: 255
}

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

function repeatSetup() {
  createCanvas(windowWidth, windowHeight);
  rows = int(windowHeight / param.resolution);
  cols = int(windowWidth / param.resolution);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function setup() {
  repeatSetup();

  let gui = new dat.GUI();
  gui.add(param, "resolution", 7, 20);
  //gui.add(param, "boolean");
  gui.add(param, "Reset Canvas");
  let bgFolder = gui.addFolder("Background Color");
  bgFolder.add(bgColor, "r", 0, 255);
  bgFolder.add(bgColor, "g", 0, 255);
  bgFolder.add(bgColor, "b", 0, 255);
  let tileFolder = gui.addFolder("Tile Color");
  tileFolder.add(tileColor, "r", 0, 255);
  tileFolder.add(tileColor, "g", 0, 255);
  tileFolder.add(tileColor, "b", 0, 255);
}

function windowResized() {
  repeatSetup();
}

function draw() {
  background(color(bgColor.r, bgColor.g, bgColor.b));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * param.resolution;
      let y = j * param.resolution;
      if (grid[i][j] == 1) {
        fill(color(tileColor.r, tileColor.g, tileColor.b));;
        rect(x, y, param.resolution, param.resolution);
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
}

function mouseClicked() {
  x = int(mouseX/param.resolution);
  y = int(mouseY/param.resolution);
  //console.log(x, y)
  grid[x][y] = 1;
  grid[(x+1)%cols][y] = 1;
  grid[x][(y+1)%rows] = 1;
  grid[(x+1)%cols][(y+1)%rows] = 1;
  //console.log(int(mouseX/resolution), int(mouseY/resolution));
}

function mouseDragged() {
  mouseClicked()
}