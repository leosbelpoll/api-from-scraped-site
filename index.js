const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const { JSDOM } = jsdom;

  const { data } = await axios.get("https://quotes.toscrape.com/");
  const dom = new JSDOM(data);

  res.send(dom.window.document.querySelector(".quote").textContent);
});


app.get("/authors", async (req, res) => {
  const { JSDOM } = jsdom;
  authors = []

  const { data } = await axios.get("https://quotes.toscrape.com/");
  const dom = new JSDOM(data);

  
  const ss = dom.window.document.querySelectorAll(".quote");
  console.log(ss.length)
  ss.forEach(element => {
    console.log(element)
    authors.push({
      name: element.textContent
    })
    
  });

  res.send(authors);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
