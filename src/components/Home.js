import React, { useState } from "react";
import AddStudent from "./AddStudent";
import AddBook from "./AddBook";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <AddStudent heading={"Add Student"} />
      <AddBook heading={"Add Book"} />
    </div>
  );
}

export default Home;
