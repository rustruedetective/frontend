import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

function AddBook({ heading, size, margins }) {
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleDate = (newValue) => {
    setValue(newValue);
  };

  const [inputs, setInputs] = useState({
    name: "",
    author: "",
  });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/book/create", {
        name: inputs.name,
        author: inputs.author,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setInputs({
      ...inputs,
      name: "",
      author: "",
    });
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
            label="Title"
            variant="outlined"
            required
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            size={size}
          />
        </div>
        <div>
          <TextField
            label="Author"
            variant="outlined"
            required
            type="text"
            name="author"
            value={inputs.author}
            onChange={handleChange}
            size={size}
          />
        </div>
        <Button
          sx={{ margin: margins || 2, width: "100px" }}
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddBook;
