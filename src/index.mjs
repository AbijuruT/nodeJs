import express, { request, response } from "express";

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5500;
const mockProducts = [
  { id: 1, name: "Chiken", price: 12.99 },
  { id: 2, name: "Chips", price: 499.9 },
  { id: 3, name: "Burger", price: 12.79 },
];
const mockUsers = [
  { id: 1, username: "thor", displayName: "yves" },
  { id: 2, username: "assia", displayName: "massiah" },
  { id: 3, username: "esther", displayName: "hommy" },
  { id: 4, username: "thorine", displayName: "lizzy" },
  { id: 5, username: "locky", displayName: "wizard" },
];
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Helloo world" });
});
app.get("/api/users", (request, response) => {
  // Query string
  console.log(request.query);
  const { query: { filter, value },
  } = request;
  // if (!filter && !value) return response.send(mockUsers)// when the values of filter and value are undefined
  // //
  if (filter && value) return response.send(
    mockUsers.filter((user) => user[filter].includes(value))
  );
  return response.send(mockUsers);
});
// Sending the data with POST
app.post('/api/users', (request, response) => {
  // console.log(request.body)
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser)
  return response.status(201).send(newUser);
})

app.get('/api/products', (request, response) => {
  response.send(mockProducts);
});
//Route parameter on users endPoint
app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  // Checking the validity of a param
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
});

// PUT Request
app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
})
// PATCH Request
app.patch('/api/user/:id', (request, response) => {
  const {
    body,
    params = { id },
  } = request;
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404)
})




app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});