const { Engine, Render, World, Runner, Bodies } = Matter;

const width = 600;
const height = 600;
const cells = 3;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: width,
    height: height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

//klick constraint
// World.add(
//   world,
//   MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas),
//   })
// );

//Walls
const walls = [
  //top wall
  Bodies.rectangle(width / 2, 0, width, 40, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //bottom wall
  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //left wall
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //right wall
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
];
World.add(world, walls);

//shuffling the arr
function shuffle(arr) {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

//creating rows and collumns
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

//creating verticals and horizontals
//v and h represent is there a wall or not true - no wall, false - is wall
const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

//random starting position
const startRow = Math.floor(Math.random() * cells);
const startCell = Math.floor(Math.random() * cells);

function throughtMaze(row, collumn) {
  //if i have visited cell at [row, coll], then return
  if (grid[row][collumn]) return;
  //mark the cell visited
  grid[row][collumn] = true;
  //assemble randomly-order list of neighbors
  const neighbors = shuffle([
    [row - 1, collumn, "up"],
    [row, collumn + 1, "right"],
    [row + 1, collumn, "down"],
    [row, collumn - 1, "left"],
  ]);
  //foreach neighbor
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    //see if the neighbor is out of bouds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }
    //if we visited that neigbour, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //remove wall from vercticals
    if (direction === "left") {
      verticals[row][collumn - 1] = true;
    } else if (direction === "right") {
      verticals[row][collumn] = true;
    }
    //remove wall from horizontals
    else if (direction === "up") {
      horizontals[row - 1][collumn] = true;
    } else if (direction === "down") {
      horizontals[row][collumn] = true;
    }
    throughtMaze(nextRow, nextColumn);
  }
  //visited that cell
}
throughtMaze(startRow, startCell);
