const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const param = { text: "hello world" };
  res.header("Content-Type", "applicaltion/json; charset=utf-8");
  res.send(param);
});

app.post("/", (req, res) => {
  if (req.is("application/json")) {
    res.status(201).json(req.body);
    console.log(res.body + res.sendStatus);
  }
  res.sendStatus(400);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
