import { TextField, Button, Grid } from "@mui/material";

function SearchBar(props) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.handleSubmit(event);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Search by City"
          variant="outlined"
          onChange={props.handleChange}
          onKeyPress={handleKeyPress}
          value={props.input}
        />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
