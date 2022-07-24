import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import axios from "axios";

function BookItemBorrow({ id, name, author, studentId }) {
  const [inputs, setInputs] = useState({
    borrow_date_start: "",
    borrow_date_end: "",
  });

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const borrowHandler = (id, studentId) => {
    axios
      .post("http://localhost:3001/borrow", {
        studentId: studentId,
        bookId: id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div key={id}>
      <div style={{ textAlign: "left" }}>
        <p style={{ marginLeft: 100 }}>Name : {name}</p>
        <p style={{ marginLeft: 100 }}>Author: {author}</p>
      </div>
      <form onSubmit={() => borrowHandler(id, studentId)}>
        <div style={{ textAlign: "left" }}>
          <p style={{ marginLeft: 100, color: "grey" }}>Issue Date:</p>
          <div style={{ textAlign: "center" }}>
            <input
              style={{
                color: "grey",
                border: "1px grey solid",
                borderRadius: "5px",
                height: "35px",
                width: "182px",
                textAlign: "center",
              }}
              required
              type="date"
              name="borrow_date_start"
              value={inputs.borrow_date_start}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ marginLeft: 100, color: "grey" }}>End Date:</p>
          <div style={{ textAlign: "center" }}>
            <input
              style={{
                color: "grey",
                border: "1px grey solid",
                borderRadius: "5px",
                height: "35px",
                width: "182px",
                textAlign: "center",
              }}
              required
              type="date"
              name="borrow_date_end"
              value={inputs.borrow_date_end}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          sx={{ margin: 2, width: "100px" }}
          variant="contained"
          type="submit"
        >
          Borrow
        </Button>
        <Divider variant="inset" />
      </form>
    </div>
  );
}

export default BookItemBorrow;
