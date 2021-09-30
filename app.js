const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const app = express();
const PORT = 3000;
const { db, Page, User }= require('./models/index');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/stylesheets"));
app.use(express.urlencoded({ extended: true }))

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get('/', (req, res) => {
  res.send(layout('hello world!'));
})

const init = async () => {
  try {
    await User.sync(); //{force: true} as argument when resetting
    await Page.sync();

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
  }
  catch (error) {
    console.log('We had an error! ', error);
  }
}

init();



