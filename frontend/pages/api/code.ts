// pages/api/code.js

import { exec } from "child_process";
import { writeFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("code comes here");
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const language = body.language;
      const code = body.content;
      if (language === "javascript") {
        const { stdout, stderr } = await runJavascript(code);
        res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      } else if (language === "python") {
        const { stdout, stderr } = await runPython(code);
        res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      } else if (language === "c") {
        const { stdout, stderr } = await runC(code);
        res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      } else if (language === "java") {
        const { stdout, stderr } = await runJava(code);
        res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", stdout: "", stderr: error });
    }
  } else {
    res
      .status(405)
      .json({ error: "Method Not Allowed", stdout: "", stderr: "" });
  }
}

async function runJavascript(code: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  await writeFile("index.js", code);
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app node:18 node /usr/src/app/index.js`, //mount your current working directory of your host machine in the docker container
      (error, stdout, stderr) => {
        unlinkSync("index.js");
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}

async function runPython(code: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  await writeFile("index.py", code);
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app python:3 python /usr/src/app/index.py`,
      (error, stdout, stderr) => {
        unlinkSync("index.py"); // Assuming the Python script is named index.py
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}

async function runJava(code: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  await writeFile("HelloWorld.java", code);
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app openjdk:latest sh -c "javac /usr/src/app/HelloWorld.java && chmod +x /usr/src/app/HelloWorld.class && java -cp /usr/src/app HelloWorld"
      `,
      (error, stdout, stderr) => {
        unlinkSync("HelloWorld.java"); // Assuming the Java source file is named Main.java
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}

async function runC(code: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  await writeFile("index.c", code);
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app gcc:latest sh -c "gcc -o /usr/src/app/compiled /usr/src/app/index.c && chmod +x /usr/src/app/compiled && /usr/src/app/compiled"
      `,
      (error, stdout, stderr) => {
        unlinkSync("index.c");
        if (existsSync("compiled")) {
          unlinkSync("compiled");
        }
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}
