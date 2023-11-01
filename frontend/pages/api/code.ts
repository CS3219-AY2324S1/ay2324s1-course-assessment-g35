import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(JSON.parse(req.body).files[0].content);
  const url = "https://glot.io/api/run/javascript/latest";
  const headers = {
    Authorization: "Token bce81090-0e07-4cba-8fdd-f4ac0df57022",
    "Content-Type": "application/json",
  };

  const body = {
    files: [
      {
        name: "index.js",
        content: JSON.parse(req.body).files[0].content,
      },
    ],
  };

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch((error) => {
      console.error(error);
    });
}
