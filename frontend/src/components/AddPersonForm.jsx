import personsService from "../services/persons";
import { useEffect } from "react";

const AddPersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  setNotificationMessage,
  setNotificationStyle,
}) => {
  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const isNameTaken = persons.some((person) => person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (isNameTaken) {
      if (
        window.confirm(
          `${newName} is already on the list, do you want to update the number?`,
        )
      ) {
        const repeatedPerson = persons.find(
          (person) => person.name === newName,
        );
        personsService
          .updatePerson(repeatedPerson.id, personObject)
          .then((response) => {
            // Actualiza el estado `persons` reemplazando la entrada antigua con la nueva
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === repeatedPerson.id ? response.data : person,
              ),
            );
            setNotificationStyle("green");
            setNotificationMessage(`Updated ${response.data.name}'s number`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationStyle("red");
            setNotificationMessage(
              `Information of ${newName}'s number has already been removed from server.`,
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      personsService
        .createPerson(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNotificationStyle("green");
          setNotificationMessage(`${response.data.name} added`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotificationStyle("red");
          setNotificationMessage(error.response.data.error);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
