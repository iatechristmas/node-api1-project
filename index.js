const express = require("express");
const shortid = require("shortid");

const server = express();

server.get("/", (req, res) => {});

server.get("/api", (req, res) => {});

server.post("/api", (req, res) => {});

server.delete("/api", (req, res) => {});

server.put("/api", (req, res) => {});

const PORT = 8000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
