// TODO: 2) validating form + fixing inputs, 3) form success + creating a new question
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./QuestionForm.module.css"

import {
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { QuestionsData } from "@/data/questionsData";

export default function QuestionForm() {
  const questionCategories = [
    { value: "strings", label: "Strings" },
    { value: "algorithms", label: "Algorithms" },
    { value: "data structures", label: "Data Structures" },
    { value: "bit manipulation", label: "Bit Manipulation" },
    { value: "recursion", label: "Recursion" },
    { value: "databases", label: "Databases" },
    { value: "brainteaser", label: "Brainteaser" },
  ];

  const questionComplexities = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [complexity, setComplexity] = useState<string | null>(null);
  const [form, setFormData] = useState<QuestionsData> (
    {
      id: Math.floor(Math.random() * 500) + 50, title: "", description: "", link: "", categories: [], complexity: ""
    })

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let title = localStorage.getItem("title");
      let description = localStorage.getItem("description");
      let link = localStorage.getItem("link");
      let categories: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        categories.push(localStorage.key(i)!);
      }
      setTitle(title);
      setDescription(description);
      setLink(link);
      setCategories(categories);
    }
  }, []);

const handleInput = (e: any, field: string, value: any) => {

  if (field === "categories" || field === "complexity") {
    value = e;
    if (field === "categories") {
      setFormData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        complexity: value.value,
      }));
    }
  } else {
    value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(field, value);

    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "link":
        setLink(value);
        break;
      case "categories":
        setCategories(value);
        break;
      case "complexity":
        setComplexity(value);
        break;
      default:
        break;
    }
  }
};

const isFormValid = () => {
  if (title && link && categories && complexity) {
    return true;
  }
  return false;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (isFormValid()) {
    console.log("Form submitted with data:", form);
  } else {
    alert("Please fill in all required fields.");
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <FormControl 
        isRequired
        className={styles.field}
      >
        <FormLabel>Title</FormLabel>
        <Input
          type="title"
          onChange={(e) => {
            handleInput(e, "title", e.target.value)
          }}
          variant="flushed"
        />
      </FormControl>

      <FormControl
        className={styles.field}
      >
        <FormLabel>Description</FormLabel>
        <Input 
          type="description" 
          onChange={(e) => {
            handleInput(e, "description", e.target.value)
          }}
          variant="flushed"
        />
      </FormControl>

      <FormControl 
        className={styles.field}
        isRequired
      >
        <FormLabel>Link</FormLabel>
        <Input 
          type="link" 
          onChange={(e) => {
            handleInput(e, "link", e.target.value)
          }}
          variant="flushed"
        />
      </FormControl>

      <FormControl 
        className={styles.field}
        isRequired
      >
        <FormLabel>Categories</FormLabel>
        <Select
          options={questionCategories}
          onChange={(e: any) => {
            handleInput(e, "categories", e)
          }}
          isMulti
          placeholder="Select categories"
        />
      </FormControl>

      <FormControl 
        className={styles.field}
        isRequired>
        <FormLabel>Complexity</FormLabel>
        <Select
          options={questionComplexities}
          onChange={(e) =>
            handleInput(e, "complexity", e)
          }
          placeholder="Select a complexity"
        />
      </FormControl>

      <button
        className={styles.button}
        type="submit"
      >
        Create question
      </button>
      </form>
    </div>
  );
}
