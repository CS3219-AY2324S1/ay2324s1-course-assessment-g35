const functions = require("@google-cloud/functions-framework");
const cheerio = require("cheerio");

functions.http("helloHttp", (req, res) => {
  fetch("https://bishalsarang.github.io/Leetcode-Questions/out.html", {
    method: "GET",
  })
    .then((response) => response.text())
    .then(async (result) => {
      const $ = cheerio.load(result);

      const titleDivs = $('[id^="title"]');

      titleDivs.each(async (index, titleDiv) => {
        // Extract the title
        const title = $(titleDiv).text().trim();
        console.log(title);
        const match = title.match(/(\d+)\./);
        const integerBeforeDot = parseInt(match[1], 10);
        if (integerBeforeDot != null || integerBeforeDot != undefined) {
          console.log(integerBeforeDot);
          // Extract the corresponding content
          const contentDiv = $(titleDiv).next(
            ".content__u3I1.question-content__JfgR"
          );
          const content = contentDiv.html();
          // Saves the entity
          const question = {
            title: title,
            description: content,
          };
          await fetch("http://34.126.71.94:8000/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Response:", data);
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }
      });
    });
});
