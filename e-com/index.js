const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

//globaly added middleware, doesn't work for get reqeusts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["nigoefa24igohiaerwt4oit4hja"],
  })
);
//routes for signin and signup
app.use(authRouter);
//routes for products (CRUD)
app.use(productsRouter);
//middlewate for public folder
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("listening");
});
