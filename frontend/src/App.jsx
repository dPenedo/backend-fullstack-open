import { useState, useEffect } from "react";
import AddPersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStyle, setNotificationStyle] = useState("green");
  useEffect(() => {
    axios.get("http://localhost:3001/api/persons").then((response) => {
      console.log("primer get a persons: ", response);
      setPersons(response.data);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AddPersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setNotificationMessage={setNotificationMessage}
        setNotificationStyle={setNotificationStyle}
      />
      <Numbers setPersons={setPersons} personsToShow={personsToShow} />
    </div>
  );
};

export default App;
