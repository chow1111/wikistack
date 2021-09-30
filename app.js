const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const app = express();
const PORT = 3000;
const { db, Page, User } = require("./models/index");
const users = require("./routes/users");
const wiki = require("./routes/wiki");

app.use(morgan("dev")); // logs backend happenings in the console
app.use(express.static(__dirname + "/stylesheets")); // refers to the css file in the stylesheets directory
app.use(express.urlencoded({ extended: true })); // body parsing middleware

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use("/users", users); // sets up middleware handling all /users routes
app.use("/wiki", wiki); // sets up middleware handling all /wiki routes

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const init = async () => {
  try {
    await User.sync(); //{force: true} as argument when resetting
    await Page.sync();

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
  } catch (error) {
    console.log("We had an error! ", error);
  }
};

init();
