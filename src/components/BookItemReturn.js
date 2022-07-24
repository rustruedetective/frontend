import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import axios from "axios";

function BookItemBorrow({ id, name, author, studentId }) {
  const returnHandler = (id, studentId) => {
    axios
      .post("http://localhost:3001/borrow/return", {
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

      <form onSubmit={() => returnHandler(id, studentId)}>
        <Button
          sx={{ margin: 2, width: "100px" }}
          variant="contained"
          type="submit"
        >
          Return
        </Button>
      </form>
      <Divider variant="inset" />
    </div>
  );
}

export default BookItemBorrow;
