const express = require("express");
const { exec } = require("child_process");
const { writeFileSync, existsSync, unlinkSync } = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3005; // You can change this to any port you prefer

app.use(express.json());
app.use(cors());
app.post("/code", async (req, res) => {
  console.log("Code comes here");
  try {
    console.log(req.body);
    const body = req.body;
    const language = body.language;
    const code = body.content;
    console.log(language);
    console.log(code);
    if (language === "javascript") {
      const { stdout, stderr, error } = await runJavascript(code);
      res.status(200).json({ error: error, stdout: stdout, stderr: stderr });
    } else if (language === "python") {
      const { stdout, stderr, error } = await runPython(code);
      res.status(200).json({ error: error, stdout: stdout, stderr: stderr });
    } else if (language === "c") {
      const { stdout, stderr, error } = await runC(code);
      res.status(200).json({ error: error, stdout: stdout, stderr: stderr });
    } else if (language === "java") {
      const { stdout, stderr, error } = await runJava(code);
      res.status(200).json({ error: error, stdout: stdout, stderr: stderr });
    }
  } catch (error) {
    console.log("Internal serval error");
    res
      .status(500)
      .json({ error: "Internal Server Error", stdout: "", stderr: error });
  }
});

async function runJavascript(code) {
  await writeFileSync("Test.js", code);
  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app node:18 node /usr/src/app/Test.js`,
      (error, stdout, stderr) => {
        unlinkSync("Test.js");
        if (error) {
          console.log("error executed when running Javascript");
        }
        resolve({ stdout, stderr, error });
      }
    );
  });
}

async function runPython(code) {
  await writeFileSync("index.py", code);
  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app python:3 python /usr/src/app/index.py`,
      (error, stdout, stderr) => {
        unlinkSync("index.py");
        if (error) {
          console.log("error executed when running python");
        }
        resolve({ stdout, stderr, error });
      }
    );
  });
}

async function runJava(code) {
  await writeFileSync("HelloWorld.java", code);
  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app openjdk:latest sh -c "javac /usr/src/app/HelloWorld.java && chmod +x /usr/src/app/HelloWorld.class && java -cp /usr/src/app HelloWorld"`,
      (error, stdout, stderr) => {
        unlinkSync("HelloWorld.java");
        if (existsSync("HelloWorld.class")) {
          unlinkSync("HelloWorld.class");
        }
        if (error) {
          console.log("error executed when running Java");
        }
        resolve({ stdout, stderr, error });
      }
    );
  });
}

async function runC(code) {
  await writeFileSync("index.c", code);
  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app gcc:latest sh -c "gcc -o /usr/src/app/compiled /usr/src/app/index.c && chmod +x /usr/src/app/compiled && /usr/src/app/compiled"`,
      (error, stdout, stderr) => {
        unlinkSync("index.c");
        if (existsSync("compiled")) {
          unlinkSync("compiled");
        }
        if (error) {
          console.log("error executed when running Java");
        }
        resolve({ stdout, stderr, error });
      }
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
