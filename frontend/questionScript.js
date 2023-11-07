// run this file using 'node questionScript.js' to get the question content in html format

const cheerio = require("cheerio");

const targetInteger = 187; // 141 344 187

fetch("https://bishalsarang.github.io/Leetcode-Questions/out.html", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(findContentByInteger(result, targetInteger));
    })
    .catch((error) => console.log("error", error));

function findContentByInteger(htmlCode, targetInteger) {
  const $ = cheerio.load(htmlCode);

  const contentArray = [];

  $('[id="title"]').each((index, element) => {
    const titleText = $(element).text();
    const regex = /(\d+)\.\s/;
    const match = titleText.match(regex);

    if (match && match[1]) {
      const foundInteger = parseInt(match[1], 10);
      if (foundInteger === targetInteger) {
        const contentDiv = $(element).next(
          "div.content__u3I1.question-content__JfgR"
        );
        if (contentDiv.length > 0) {
          const contentHtml = element.toString() + contentDiv.toString();
          contentArray.push(contentHtml);
        }
      }
    }
  });

  return contentArray.map((content) =>
    content.replace(/\[object Object\]/g, "")
    .replace(/\n/g, '')
    // .replace(/ +/g, ' ')
  );
}