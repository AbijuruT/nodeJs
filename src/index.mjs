import express from "express";

const app = express();

const PORT = process.env.PORT || 5500;
app.get("/", (req, response) => {
  response.status(201).send({ msg: "Helloo world" });
});
app.get("/api/users", (request, response) => {
  response.send([
    { id: 1, username: "Thor", displayName: "Yves" },
    { id: 2, username: "Assia", displayName: "Massiah" },
    { id: 3, username: "Esther", displayName: "Hommy" },
    { id: 4, username: "Thorine", displayName: "lizzy" },
    { id: 5, username: "Locky", displayName: "wizard" },
  ]);
});

app.get('/api/products', (request, response) => {
  response.send([
    { id: 1, name: "Chiken", price: 12.99 },
    { id: 2, name: "Chips", price: 499.9 },
    { id: 3, name: "Burger", price: 12.79 },
  ]);
});
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});