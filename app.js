const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(layout('hello world!'));
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
