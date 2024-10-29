const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

const Users = [];

app.use(cors());
app.use(express.json());

//get all users
app.get("/users", (req, res) => {
  res.status(200).json(Users);
});

//get specifique user
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = Users.find((items) => items.id === id);
  res.status(200).json(user);
});

//add user
app.post("/user", (req, res) => {
  const newUser = req.body;
  Users.push(newUser);
  res.json({ message: "user added successfully " });
});

//edit user
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  let { nom, prenom, age } = req.body;

  const userIndex = Users.findIndex((item) => item.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  Users[userIndex] = { ...Users[userIndex], nom, prenom, age };

  res.status(200).json({ message: "user updated with success" });
});

//delet user
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = Users.findIndex((item) => item.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "user not found" });
  }

  Users.splice(userIndex, 1);

  res.status(200).json({ message: "user deleted" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
