const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

//globaly added middleware, doesn't work for get reqeusts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["nigoefa24igohiaerwt4oit4hja"],
  })
);

app.get("/signup", function (req, res) {
  res.send(`
  <div>
  Your Id: ${req.session.userId}
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" type="password" />
      <input name="passwordConfirm" placeholder="password-confirm" type="password" />
      <button>Sign Up!</button>
    </form>
  </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already existing.");
  }

  if (password !== passwordConfirm) {
    return res.send("Passwords doesn't match.");
  }

  //create a user into repository
  const user = await usersRepo.create({ email, password });
  //store id of that user inside the users cookie
  req.session.userId = user.id;

  res.send(`Acc created Your Id: ${req.session.userId}`);
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send(`You signed out!`);
});

app.get("/signin", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" type="password" />
      <button>Sign In!</button>
    </form>
  </div>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send(`There is no user with this email!`);
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send(`Incorrect password!`);
  }
  req.session.userId = user.id;
  res.send("You are signed in!");
});

app.listen(3000, function () {
  console.log("listening");
});
