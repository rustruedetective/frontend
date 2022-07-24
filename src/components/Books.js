import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import BookItemBorrow from "./BookItemBorrow";
import BookItemReturn from "./BookItemReturn";

function Books({ mode, studentId }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/book/read/all").then((res) => {
      setBooks(res.data.list);
    });
  }, []);

  const booksEl = books.map((el) => (
    <div key={el.id}>
      {mode === "borrow" ? (
        <BookItemBorrow
          key={el.id}
          id={el.id}
          name={el.name}
          author={el.author}
          studentId={studentId}
        />
      ) : (
        <></>
      )}
      {mode === "list" ? (
        <BookItem key={el.id} id={el.id} name={el.name} author={el.author} />
      ) : (
        <></>
      )}
    </div>
  ));

  return <div>{booksEl}</div>;
}

export default Books;
