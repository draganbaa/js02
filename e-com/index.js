const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send(`
  <div>
  <form method="POST">
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" type="password" />
    <input name="password-confirm" placeholder="password-confirm" type="password" />
    <button>Sign Up!</button>
  </form>
</div>
  `);
});

app.post("/", (req, res) => {
  res.send("Acc created");
});

app.listen(3000, function () {
  console.log("listening");
});
