import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Book() {
  const [state, setState] = useState({
    name: "",
    author: "",
  });
  const [inputs, setInputs] = useState({
    name: "",
    author: "",
  });

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/book/read", { id })
      .then((res) =>
        setState({
          name: res.data.item.name,
          author: res.data.item.author,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const updateHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/book/update", {
        id: id,
        name: inputs.name,
        author: inputs.author,
      })
      .then((res) => {
        if (res.status === 200) {
          setInputs({
            name: "",
            author: "",
          });
          axios
            .post("http://localhost:3001/book/read", { id })
            .then((res) => setState({ ...res.data.item }))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
    axios
      .post("http://localhost:3001/book/delete", { id })
      .then((res) => {
        if (res.status === 200) navigate("../books", { replace: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={2} sx={{ width: "40vw", padding: "10vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 300,
            },
          }}
        >
          <Paper elevation={3} sx={{ textAlign: "left" }}>
            <Typography
              sx={{ margin: 1, marginLeft: 0, textAlign: "center" }}
              variant="h6"
              component="div"
              gutterBottom
            >
              Details
            </Typography>
            <p style={{ marginLeft: 100 }}>First Name: {state.name}</p>
            <p style={{ marginLeft: 100 }}>Last Name: {state.author}</p>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 300,
            },
          }}
        >
          <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Typography
              sx={{ margin: 1, marginLeft: 0 }}
              variant="h6"
              component="div"
              gutterBottom
            >
              Edit
            </Typography>
            <form onSubmit={updateHandler}>
              <div>
                <TextField
                  sx={{ paddingBottom: 0.5 }}
                  label="Title"
                  variant="outlined"
                  required
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  size="small"
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
                  size="small"
                />
              </div>

              <Button
                sx={{ margin: 0.5, marginBottom: 0, width: "100px" }}
                variant="contained"
                type="submit"
                startIcon={<EditIcon />}
              >
                Update
              </Button>
            </form>
          </Paper>
        </Box>

        <Button
          sx={{ margin: 2, width: "100px" }}
          variant="contained"
          onClick={deleteHandler}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Paper>
    </Box>
  );
}

export default Book;
