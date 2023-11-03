// pages/api/code.js

import { exec } from "child_process";
import { writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("code comes here");
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const body = JSON.parse(req.body);
      console.log(body);
      const code = body.content;
      await writeFile("index.js", code);

      exec("node index.js", (error, stdout, stderr) => {
        if (error) {
          console.log("error executing");
          console.log(`Error: ${error.message}`);
          res
            .status(500)
            .json({ error: error.message, stdout: "", stderr: stderr });
        } else {
          console.log(`stdout: ${stdout}`);
          res.status(200).json({ error: "", stdout: stdout, stderr: stderr });
        }
      });
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
