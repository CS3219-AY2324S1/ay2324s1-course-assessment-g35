// pages/api/code.js

import { exec } from "child_process";
import { writeFile } from "fs/promises";
import { unlinkSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import Docker from "dockerode";

const docker = new Docker();

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
      await writeFile("index.js", code);
      const { stdout, stderr } = await runDockerContainer();
      // Handle stdout and stderr if needed
      res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      // exec(
      //   `docker run --rm -v ${process.cwd()}:/usr/src/app node:18 node /usr/src/app/index.js`,
      //   (error, stdout, stderr) => {
      //     unlinkSync("index.js");
      //     if (error) {
      //       console.log(`Error executing code: ${error.message}`);
      //       res
      //         .status(500)
      //         .json({ error: error.message, stdout: "", stderr: stderr });
      //     } else {
      //       console.log(`stdout: ${stdout}`);
      //       res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
      //     }
      //   }
      // );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", stdout: "", stderr: "" });
    }
  } else {
    res
      .status(405)
      .json({ error: "Method Not Allowed", stdout: "", stderr: "" });
  }
}

async function runDockerContainer(): Promise<{
  stdout: string;
  stderr: string;
}> {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/usr/src/app node:18 node /usr/src/app/index.js`,
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

// async function runDockerContainer(
//   code: string
// ): Promise<{ stdout: string; stderr: string }> {
//   console.log(code);
//   return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
//     exec(
//       `docker run --rm -i node:18 node -e "${code}"`,
//       (error, stdout, stderr) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve({ stdout, stderr });
//         }
//       }
//     );
//   });
// }
