import { useEffect } from "react";
import personsService from "../services/persons";

const DeletePerson = ({ setPersons, personId }) => {
  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const deletePerson = (event) => {
    if (window.confirm("Delete person?")) {
      console.log("delete", personId);
      personId
        ? personsService.deletePerson(personId).then(() => {
            personsService.getAll().then((response) => {
              setPersons(response.data);
            });
          })
        : console.log("there's no id");
    }
  };

  return <button onClick={deletePerson}>Delete</button>;
};

export default DeletePerson;
