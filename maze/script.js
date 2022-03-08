const { Engine, Render, World, Runner, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const cellsHorizontal = 14;
const cellsVertical = 10;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
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
  Bodies.rectangle(width / 2, 0, width, 2, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //bottom wall
  Bodies.rectangle(width / 2, height, width, 2, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //left wall
  Bodies.rectangle(0, height / 2, 2, height, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  //right wall
  Bodies.rectangle(width, height / 2, 2, height, {
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
const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

//creating verticals and horizontals
//v and h represent is there a wall or not true - no wall, false - is wall
const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

//random starting position
const startRow = Math.floor(Math.random() * cellsVertical);
const startCell = Math.floor(Math.random() * cellsHorizontal);

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
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
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

//drawing horizontal walls
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, collumnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      collumnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: "wall",
        isStatic: true,
        render: { fillStyle: "#ff1010" },
      }
    );
    World.add(world, wall);
  });
});

//drawing vertical walls
verticals.forEach((row, rowIndex) => {
  row.forEach((open, collumnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      collumnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: "wall",
        isStatic: true,
        render: { fillStyle: "#ff1010" },
      }
    );
    World.add(world, wall);
  });
});

//finish line
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    isStatic: true,
    render: { fillStyle: "#00ff00" },
    label: "goal",
  }
);
World.add(world, goal);

//ball creation
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
});
World.add(world, ball);

//keypresses
document.addEventListener("keydown", function (e) {
  const { x, y } = ball.velocity;

  if (e.code === "KeyW") {
    Body.setVelocity(ball, { x, y: y - 5 });
  }
  if (e.code === "KeyA") {
    Body.setVelocity(ball, { x: x - 5, y });
  }
  if (e.code === "KeyS") {
    Body.setVelocity(ball, { x, y: y + 5 });
  }
  if (e.code === "KeyD") {
    Body.setVelocity(ball, { x: x + 5, y });
  }
});

//isWin
Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach(function (collision) {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      world.gravity.y = 1;
      world.bodies.forEach(function (body) {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
      //win message
      document.querySelector(".winner").classList.remove("hidden");
      //play again
      document.querySelector("button").addEventListener("click", function () {
        location.reload(true);
      });
    }
  });
});
