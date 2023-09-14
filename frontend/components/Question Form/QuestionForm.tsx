// TODO: 1) storing data submitted from form, 2) validating form + fixing inputs, 3) form success
import React, { useState } from "react"

export default function Contact() {
  const questionCategories = [
    "Strings", "Algorithms", "Data Structures", "Bit Manipulation", "Recursion", "Databases", "Brainteaser"
  ]
  const questionComplexities = [
    "Easy", "Medium", "Hard"
  ]

  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");

  const [questionData, setQuestionData] = useState(
    {
      id: "",
      title: "",
      description: "",
      category: "",
      complexity: "",
      link: ""
    }
  );

  const handleInput = (e : any, field: string) => {
    const fieldName = field;
    const fieldValue = e.target.value;

    setQuestionData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }
  
  // const [formSuccess, setFormSuccess] = useState(false)
  // const [formSuccessMessage, setFormSuccessMessage] = useState("")

  // const submitForm = (e : any) => {
  //   e.preventDefault() // to prevent refresh

  //   const formURL = e.target.action
  //   const data = new FormData()

  //   // Turn our formData state into data we can use with a form submission
  //   Object.entries(questionData).forEach(([key, value]) => {
  //     data.append(key, value);
  //   })

  //   // POST the data to the URL of the form
  //   fetch(formURL, {
  //     method: "POST",
  //     body: data,
  //     headers: {
  //       'accept': 'application/json',
  //     },
  //   }).then((response) => response.json())
  //   .then((data) => {
  //     setQuestionData({ 
  //       id: "",
  //       title: "",
  //       description: "",
  //       category: "",
  //       complexity: "",
  //       link: "",
  //     })

  //     setFormSuccess(true)
  //     setFormSuccessMessage(data.submission_text)
  //   })
  // }

  return (
    <div>
      {/* {formSuccess ? 
        <div>{formSuccessMessage}</div> 
        :  */}

        {/* <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}> */}
          <div>
            <label>Title</label>
            <input type="title" name="title" placeholder="Enter title here" onChange={(e) => { handleInput(e, "title")}} />
          </div>

          <div>
            <label>Description</label>
            <input type="description" name="description" placeholder="Enter description here" onChange={(e) => { handleInput(e, "description")}} />
          </div>

          <div>
            <label>Category</label>
            <select value={category}
              onChange={(e) => {
              setCategory(e.target.value);
              handleInput(e, "category")
              }}>
                {questionCategories.map(questionCategory => (
                  <option
                    key={questionCategory} 
                    value={questionCategory}
                  >
                    {questionCategory}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Complexity</label>
            <select value={complexity}
              onChange={(e) => {
                setComplexity(e.target.value);
                handleInput(e, "complexity")
              }}>
                {questionComplexities.map(questionComplexity => (
                  <option 
                    key={questionComplexity} 
                    value={questionComplexity}
                  >
                    {questionComplexity}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit">Create question</button>
      </div>
  )
}
