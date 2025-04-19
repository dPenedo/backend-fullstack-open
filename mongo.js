const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://dpenedo:${password}@phonebook.kdpmk.mongodb.net/phonebook?retrywrites=true&w=majority&appname=phonebook`;

// mongoose.set("strictquery", false);
mongoose.connect(url);

const personschema = new mongoose.schema({
    name: string,
    number: string,
});
const person = mongoose.model("person", personschema);

if (process.argv.length === 3) {
    console.log("phonebook:");
    person.find({}).then((persons) => {
        persons.foreach((person) => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new person({
        name: name,
        number: number,
    });

    person.save().then((result) => {
        console.log(`added ${person.name}, number ${person.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log("invalid number of candidates");
    mongoose.connection.close();
}
