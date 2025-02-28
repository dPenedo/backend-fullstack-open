require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const PORT = process.env.PORT;
// Frontend
app.use(express.static("dist"));

// Data to JSON
app.use(express.json());

// + info on console
const morgan = require("morgan");
app.use(morgan("tiny"));
morgan.token("post", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

// GET general info
app.get("/info", (request, response) => {
  Person.countDocuments({})
    .then((numberOfPersons) => {
      let date_obj = new Date();
      response.send(
        `<p>Phonebook has info for ${numberOfPersons} people</p><p>${date_obj}</p>`,
      );
    })
    .catch((error) => next(error));
});

// GET all
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// GET by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST person
app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    console.log("undefined body content => ", body);
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  console.log("person => ", person);
  person
    .save()
    .then((savedPerson) => {
      if (savedPerson) {
        response.json(savedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// DELETE person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT duplicated name
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    console.log("undefined body content => ", body);
    return response.status(400).json({ error: "content missing" });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  console.log("person => ", person);

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.listen(PORT);
console.log("Running on PORT => ", PORT);
