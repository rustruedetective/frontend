import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import StudentItem from "./StudentItem";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/student/read/all").then((res) => {
      setStudents(res.data.list);
    });
  }, []);

  const studentsEl = students.map((el) => (
    <StudentItem
      key={el.id}
      id={el.id}
      first_name={el.first_name}
      last_name={el.last_name}
    />
  ));

  return <div>{studentsEl}</div>;
}

export default Students;
