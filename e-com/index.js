const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

//globaly added middleware, doesn't work for get reqeusts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["nigoefa24igohiaerwt4oit4hja"],
  })
);
app.use(authRouter);

app.listen(3000, function () {
  console.log("listening");
});
