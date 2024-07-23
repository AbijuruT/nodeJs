import express from "express";

const app = express();

const PORT = process.env.PORT || 5500;
app.get("/", (req, response) => {
  response.status(201).send({ msg: "Helloo world" });
});
app.get("/api/users", (request, response) => {
  response.send([
    { id: 1, username: "Thor", displayName: "Yves" },
    { id: 1, username: "Assia", displayName: "Massiah" },
    { id: 1, username: "Thor", displayName: "Yves" },
    { id: 1, username: "Thor", displayName: "Yves" },
    { id: 1, username: "Thor", displayName: "Yves" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});