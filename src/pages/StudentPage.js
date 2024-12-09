import React from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const StudentPage = () => {
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "Students"));
      const studentData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentData);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.academicLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentPage;
