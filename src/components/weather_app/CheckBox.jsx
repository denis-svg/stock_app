import { Checkbox, FormControlLabel } from "@mui/material";

function CheckBox(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={props.isChecked} onChange={props.handleChange} />
      }
      label="Use Fahrenheit"
    />
  );
}

export default CheckBox;
