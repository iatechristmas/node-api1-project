const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

//// GET ////

server.get("/", (req, res) => {
  res.status(200).send("<p>The server is running</p>");
});

server.get("/api/users", (req, res) => {
  users
    ? res.json(users)
    : res
        .status(500)
        .json({ errorMessage: "The users information could not be retrieved" });
});

server.get("api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    ? users.map((user) =>
        user.id == id
          ? res.status(200).json(user)
          : res.status(404).json({
              message: "The user with the specified ID does not exist",
            })
      )
    : res.status(500).json({
        errorMessage: "The user information could not be retrieved",
      });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) {
    res.status(200).json(user);
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "the user information could not be retrieved" });
  }
});

//// POST ////

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (newUser.name && newUser.bio) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

//// DELETE ////

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = users.find((user) => user.id === id);
  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(users);
  } else if (!deleted) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed." });
  }
});

//// PUT ////

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const edit = req.body;
  let found = users.find((h) => h.id === id);
  if (!edit.name || !edit.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (found) {
    Object.assign(found, edit);
    res.status(200).json(found);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

const PORT = 8000;

server.listen(PORT, () => console.log(`**** listening on port ${PORT}`));
