import DeletePerson from "./DeletePerson";

const Numbers = ({ setPersons, personsToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <DeletePerson setPersons={setPersons} personId={person.id} />
        </p>
      ))}
    </>
  );
};

export default Numbers;
