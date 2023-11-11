// connecting to server and database
// define microservice routes in another file to define the api endpoints

// entry point of microservice which sets up web server, configures middleware, and defines routes
// listens on a port for incoming HTTP requests
// uses the routing logic from router.ts to handle requests made

import cors from 'cors'
import express, {
  Application,
  Request, 
  Response
}
from 'express'
import { Server } from 'http'
import { questionsRouter } from './router'
import { questionsAssignmentRouter } from './assignmentRouter'
import verifyJWT from './middleware/verifyJWT'

const cookieParser = require('cookie-parser')
const app: Application = express()

app.use(cors()) // Restricts API request from one domain to another domain
app.use(express.json()) // Parses incoming JSON data from HTTP requests
app.use(cookieParser())
app.use("/", questionsRouter) // Connects to the Questions Router
app.use('/assignment', verifyJWT, questionsAssignmentRouter); // Connects to the Questions Assignment Router
// app.use('/assignment', questionsAssignmentRouter); // Connects to the Questions Assignment Router

const PORT: number = Number(process.env.PORT) || 8001
const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
