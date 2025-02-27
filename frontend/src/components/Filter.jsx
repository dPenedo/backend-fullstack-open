const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <p>
      Filter shown with{" "}
      <input value={newFilter} onChange={handleFilterInputChange} />
    </p>
  );
};

export default Filter;
