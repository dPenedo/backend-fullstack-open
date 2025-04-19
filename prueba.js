const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

// Cadena de conexión (asegúrate de que apunta a la base de datos "phonebook")
const MONGODB_URI = 'mongodb+srv://dpenedo:okok098@phonebook.kdpmk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook';

// Conectar a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conexión a MongoDB establecida');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });

// Definir un esquema y modelo
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// Especificar explícitamente la colección "people"
const Person = mongoose.model('Person', personSchema, 'people');

// Ruta para obtener todas las personas
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then((persons) => {
            console.log('Datos encontrados en la colección "people":', persons); // Depuración
            if (persons) {
                response.json(persons);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

// Manejo de errores
const errorHandler = (error, request, response, next) => {
    console.error('Error:', error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'ID malformateado' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
