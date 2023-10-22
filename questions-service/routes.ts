import express from 'express'
const db = require('./database')

export const questionsRouter = express.Router()

// Get random question by difficulty
questionsRouter.get('/questions/random', (req, res) => {
  try {
    const difficulty = req.query
    // add error checking if the difficulty is provided/one of the 3 options available
    const randomQuestion = db.collection('questions').aggregate([
      {$match: {"difficulty" : difficulty}},
      {$sample: {size: 1}}
    ])
    return res.json(randomQuestion)

  } catch (error: any) {
      return res.status(500).json(error.message)
  }
  
})

// Get question name
questionsRouter.get('/questions/name', (req, res) => {
  try {
    const name = req.params
    const question = db.collection('questions').find(
      { title: {$eq: name }}
    )
    return res.json(question)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})