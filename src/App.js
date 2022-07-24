import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Home from "./components/Home";
import Students from "./components/Students";
import Student from "./components/Student";
import Books from "./components/Books";
import Book from "./components/Book";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Students" component={Link} to="/students" />
          <Tab label="Books" component={Link} to="/books" />
        </Tabs>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/books" element={<Books mode="list" />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
