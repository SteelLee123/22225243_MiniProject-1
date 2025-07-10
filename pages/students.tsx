import { useEffect, useState } from 'react';

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, name, email })
    });
    setStudentId("");
    setName(""); 
    setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Students</h1>
      <input 
        placeholder="Student ID" 
        value={studentId} 
        onChange={e => setStudentId(e.target.value)} 
      />
      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <button onClick={addStudent}>Add</button>
      <ul>
        {students.map((s, i) => (
          <li key={i}>ID: {s.id} - Student ID: {s.studentId} - {s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}
