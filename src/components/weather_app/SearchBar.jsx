import { TextField, Button, Grid } from "@mui/material";

function SearchBar(props) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Search by City"
          variant="outlined"
          onChange={props.handleChange}
          value={props.input}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
