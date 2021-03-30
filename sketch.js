let grid;
let rows;
let cols;

param = {
  "Resolution": 7,
  "boolean": true,
  "Reset Canvas": function() {
    repeatSetup();
  },
  "Clear Canvas": function() {
    repeatSetup();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
  },
  "Draw Shape": "Square"
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
  rows = int(windowHeight / param.Resolution);
  cols = int(windowWidth / param.Resolution);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      randNum = random(10);
      if (randNum > 9) {
        grid[i][j] = 1
      }
      else {
        grid[i][j] = 0
      }
    }
  }
}

function setup() {
  repeatSetup();

  let gui = new dat.GUI();
  gui.add(param, "Resolution", 5, 20);
  //gui.add(param, "boolean");
  gui.add(param, "Draw Shape", { 
    'Square': 'Square', 
    'Glider': 'Glider', 
    'Light Spaceship': 'Light Spaceship',
    'Heavy Spaceship': 'Heavy Spaceship'});
  let bgFolder = gui.addFolder("Background Color");
  bgFolder.add(bgColor, "r", 0, 255);
  bgFolder.add(bgColor, "g", 0, 255);
  bgFolder.add(bgColor, "b", 0, 255);
  let tileFolder = gui.addFolder("Tile Color");
  tileFolder.add(tileColor, "r", 0, 255);
  tileFolder.add(tileColor, "g", 0, 255);
  tileFolder.add(tileColor, "b", 0, 255);
  gui.add(param, "Reset Canvas")
  gui.add(param, "Clear Canvas")
}

function windowResized() {
  repeatSetup();
}

function draw() {
  background(color(bgColor.r, bgColor.g, bgColor.b));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * param.Resolution;
      let y = j * param.Resolution;
      if (grid[i][j] == 1) {
        fill(color(tileColor.r, tileColor.g, tileColor.b));;
        rect(x, y, param.Resolution, param.Resolution);
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
  x = int(mouseX/param.Resolution);
  y = int(mouseY/param.Resolution);

  //console.log(mouseX, mouseY);
  //console.log(int(mouseX/Resolution), int(mouseY/Resolution));

  // Prevent drawing when using controls
  if ((mouseX > windowWidth-261) && (mouseY < 191)) {
    ;
  }
  else if (param["Draw Shape"] == "Square") {
    grid[x][y] = 1;
    grid[(x+1)%cols][y] = 1;
    grid[x][(y+1)%rows] = 1;
    grid[(x+1)%cols][(y+1)%rows] = 1;
  }
  else if (param["Draw Shape"] == "Glider") {
    grid[x][y] = 1;
    grid[x+1][y+1] = 1;
    grid[x+2][y] = 1;
    grid[x+2][y-1] = 1;
    grid[x+2][y+1] = 1;
  }
  else if (param["Draw Shape"] == "Light Spaceship") {
    grid[x][y] = 1;
    grid[x+2][y] = 1;
    grid[x][y+3] = 1;
    grid[x+1][y+4] = 1;
    grid[x+2][y+4] = 1;
    grid[x+3][y+4] = 1;
    grid[x+3][y+1] = 1;
    grid[x+3][y+2] = 1;
    grid[x+3][y+3] = 1;
    grid[x+3][y+4] = 1;
  }
  else if (param["Draw Shape"] == "Heavy Spaceship") {
    grid[x][y] = 1;
    grid[x-1][y+2] = 1;
    grid[x-1][y+3] = 1;
    grid[x][y+5] = 1;
    grid[x+1][y+6] = 1;
    grid[x+2][y+6] = 1;
    grid[x+3][y+6] = 1;
    grid[x+2][y] = 1;
    grid[x+3][y+1] = 1;
    grid[x+3][y+2] = 1;
    grid[x+3][y+3] = 1;
    grid[x+3][y+4] = 1;
    grid[x+3][y+5] = 1;
  }
}

function mouseDragged() {
  mouseClicked()
}