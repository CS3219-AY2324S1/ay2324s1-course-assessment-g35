// TODO: 2) validating form + fixing inputs, 3) form success + creating a new question
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./QuestionForm.module.css"

import {
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [complexity, setComplexity] = useState(questionComplexities[0].value);

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

const handleInput = (e: any, field: string) => {
  let value;

  if (field === "categories" || field === "complexity") {
    // For Select components
    value = e;
  } else {
    // For text inputs
    value = e.target.value;
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


  return (
    <div className={styles.container}>
      <FormControl 
        isRequired
        className={styles.field}
      >
        <FormLabel>Title</FormLabel>
        <Input
          type="title"
          onChange={(e) => {
            handleInput(e, "title")
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
            handleInput(e, "description")
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
            handleInput(e, "link")
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
            handleInput(e, "categories")
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
            handleInput(e, "complexity")
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
    </div>
  );
}
