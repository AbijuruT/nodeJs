import express from "express";

const app = express();

const PORT = process.env.PORT || 5500;
const mockProducts = [
  { id: 1, name: "Chiken", price: 12.99 },
  { id: 2, name: "Chips", price: 499.9 },
  { id: 3, name: "Burger", price: 12.79 },
];
const mockUsers = [
  { id: 1, username: "Thor", displayName: "Yves" },
  { id: 2, username: "Assia", displayName: "Massiah" },
  { id: 3, username: "Esther", displayName: "Hommy" },
  { id: 4, username: "Thorine", displayName: "lizzy" },
  { id: 5, username: "Locky", displayName: "wizard" },
];
app.get("/", (req, response) => {
  response.status(201).send({ msg: "Helloo world" });
});
app.get("/api/users", (request, response) => {
  response.send(mockUsers);
});

app.get('/api/products', (request, response) => {
  response.send(mockProducts);
});
//Route parameter on users endPoint
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalid ID" });
  const findUser = mockUsers.find((user) => user.id === parsedId)
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

//Route params on products

app.get("/api/products/:id", (req, resp) => {
  const makeInt = parseInt(req.params.id);
  if (isNaN(makeInt)) return resp.status(400).send({ msg: "Ooops that's a bad request" });
  const useFindMethod = mockProducts.find((product) => product.id === makeInt)
  if (!useFindMethod) return resp.sendStatus(404);
  return resp.send(useFindMethod);
})
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});