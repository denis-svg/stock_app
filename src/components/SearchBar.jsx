function SearchBar(props) {
  return (
    <>
      <input
        placeholder="Search by City"
        onChange={props.handleChange}
        value={props.input}
        type="text"
      />
      <button type="submit" onClick={props.handleSubmit}>
        Submit
      </button>
    </>
  );
}

export default SearchBar;
