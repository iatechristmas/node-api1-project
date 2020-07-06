const express = require("express");
const shortid = require("shortid");

const server = express();

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

server.get("/", (req, res) => {
  res.status(200).send("<p>The server is working</p>");
});

server.get("/api/users", (req, res) => {
  users.length
    ? res.json(users)
    : res
        .status(500)
        .json({ errorMessage: "The users information could not be retrieved" });
});

server.get("api/users/:id", (req, res) => {
  users.length
    ? users.map((user) =>
        user.id === req.body.id
          ? res.json(user)
          : res.status(404).json({
              message: "The user with the specified ID does not exist",
            })
      )
    : res.status(500).json({
        errorMessage: "The user information could not be retrieved",
      });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  if (!req.body.name || !req.body.bio) {
    res
      .status(404)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

server.delete("/api/users/:id", (req, res) => {
  if (users.length) {
    const deleted = users.filter((h) => h.id === req.params.id);
    users = users.filter((h) => h.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(500).json({
      errorMessage: "The user could not be removed",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  if (users.length) {
    let found = users.find((h) => h.id === req.params.id);
    if (found) {
      Object.assign(found, req.body);
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be modified",
    });
  }
});

const PORT = 8000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
