// CheckBox.jsx
import { Checkbox, FormControlLabel } from "@mui/material";

function CheckBox(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.isChecked}
          onChange={props.handleChange}
          style={{ color: props.darkMode ? "white" : "inherit" }} // Set color based on darkMode prop
        />
      }
      label="Use Fahrenheit"
    />
  );
}

export default CheckBox;
