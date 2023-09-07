import Form from "@/components/Form";
import React, { useState } from "react";
import axios from "axios";

export default function UserRegister() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [tutorDone, setTutorDone] = useState<Boolean>(false);
  const [studentDone, setStudentDone] = useState<Boolean>(false);
  return (
    <>
      <Form
        name={name}
        password={password}
        email={email}
        dob={dob}
        number={number}
        school={school}
        gender={gender}
        setName={setName}
        setPassword={setPassword}
        setEmail={setEmail}
        setGender={setGender}
        setDOB={setDOB}
        setNumber={setNumber}
        setTutorDone={setTutorDone}
        setStudentDone={setStudentDone}
        setSchool={setSchool}
      />
    </>
  );
}
