import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

import Books from "./Books";
import BookItemReturn from "./BookItemReturn";

function Student() {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    books: [],
  });
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
  });
  const [borrow, setBorrow] = useState(false);
  const [borrowed, setBorrowed] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/student/read", { id })
      .then((res) =>
        setState({
          first_name: res.data.item.first_name,
          last_name: res.data.item.last_name,
          books: res.data.item.books,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleBorrowed(state);
  }, [state]);

  const handleBorrowed = async (state) => {
    const results = await Promise.all(
      state.books.map(async (id) => {
        try {
          const res = await axios.post("http://localhost:3001/book/read", {
            id,
          });
          return res.data.item;
        } catch (e) {
          console.log(e);
          return undefined;
        }
      })
    );
    setBorrowed(results);
  };

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const updateHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/student/update", {
        id: id,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
      })
      .then((res) => {
        if (res.status === 200) {
          setInputs({ first_name: "", last_name: "" });
          axios
            .post("http://localhost:3001/student/read", { id })
            .then((res) => setState({ ...res.data.item }))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
    axios
      .post("http://localhost:3001/student/delete", { id })
      .then((res) => {
        if (res.status === 200) navigate("../students", { replace: false });
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
      <Paper elevation={1} sx={{ width: "40vw", padding: "10vh" }}>
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
            <p style={{ marginLeft: 100 }}>First Name: {state.first_name}</p>
            <p style={{ marginLeft: 100 }}>Last Name: {state.last_name}</p>
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
                  label="First Name"
                  variant="outlined"
                  required
                  type="text"
                  name="first_name"
                  value={inputs.first_name}
                  onChange={handleChange}
                  size="small"
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
          <Paper elevation={3}>
            <div>
              <Typography
                sx={{ margin: 1, marginLeft: 0 }}
                variant="h6"
                component="div"
                gutterBottom
              >
                Borrowed Books
              </Typography>
              {borrowed.map((el, ind) =>
                el ? (
                  <BookItemReturn
                    key={ind}
                    id={el.id}
                    name={el.name}
                    author={el.author}
                    studentId={id}
                  />
                ) : (
                  <div key={ind}></div>
                )
              )}
              <Books mode="return" studentId={id} />
            </div>
          </Paper>
        </Box>

        <div>
          <Button
            sx={{ margin: 2, width: "100px" }}
            variant="contained"
            onClick={() => setBorrow(!borrow)}
            startIcon={<AddShoppingCartIcon />}
          >
            Borrow
          </Button>
        </div>
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
          <Paper elevation={3}>
            {borrow && (
              <div>
                <Typography
                  sx={{ margin: 1, marginLeft: 0 }}
                  variant="h6"
                  component="div"
                  gutterBottom
                >
                  Books to Borrow
                </Typography>
                <Books mode="borrow" studentId={id} />
              </div>
            )}
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}

export default Student;
