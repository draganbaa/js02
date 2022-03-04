const { Engine, Render, World, Runner, Bodies, MouseConstraint, Mouse } =
  Matter;

const width = 800;
const height = 600;

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

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

//Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 50, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  Bodies.rectangle(400, 600, 800, 50, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  Bodies.rectangle(0, 300, 50, 600, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
  Bodies.rectangle(800, 300, 50, 600, {
    isStatic: true,
    render: { fillStyle: "gray" },
  }),
];
World.add(world, walls);

//rand shapes

for (let i = 0; i < 24; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35)
    );
  }
}
