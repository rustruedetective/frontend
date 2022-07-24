import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function AddStudent({ heading, size, margins }) {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/student/create", {
        first_name: inputs.first_name,
        last_name: inputs.last_name,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setInputs({ ...inputs, first_name: "", last_name: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "left" }}>
        <Typography
          sx={{ margin: (margins || 2) * 2, marginLeft: 0 }}
          variant="h5"
          component="div"
          gutterBottom
        >
          {heading}
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            sx={{ paddingBottom: margins || 2 }}
            label="First Name"
            variant="outlined"
            required
            type="text"
            name="first_name"
            value={inputs.first_name}
            onChange={handleChange}
            size={size}
          />
        </div>
        <div>
          <TextField
            label="Last Name"
            variant="outlined"
            required
            type="text"
            name="last_name"
            value={inputs.last_name}
            onChange={handleChange}
            size={size}
          />
        </div>
        <Button
          sx={{ margin: margins || 2, width: "100px" }}
          startIcon={<AddIcon />}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddStudent;
