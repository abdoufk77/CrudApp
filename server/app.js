const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const users = [
  {
    id: 1,
    nom: "foukahy",
    prenom: "abdou",
    age: 23,
  },
  {
    id: 2,
    nom: "foukahy2",
    prenom: "abdou2",
    age: 23,
  },
];

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
