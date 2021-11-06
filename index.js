const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");

const app = express();
const port = process.env.PORT || 3000;

const baseUrl = process.env.BASE_URL || "https://quotes.toscrape.com";

const getDom = async (url = baseUrl) => {
  const { data } = await axios.get(url);
  const dom = new jsdom.JSDOM(data);

  return dom.window.document;
};

app.get("/", async (req, res) => {
  const dom = await getDom();

  res.send(dom.querySelector(".quote").textContent);
});

app.get("/authors", async (req, res) => {
  const { JSDOM } = jsdom;
  authors = [];

  const { data } = await axios.get("https://quotes.toscrape.com/");
  const dom = new JSDOM(data);

  const ss = dom.window.document.querySelectorAll(".quote");
  console.log(ss.length);
  ss.forEach((element) => {
    console.log(element);
    authors.push({
      name: element.textContent,
    });
  });

  res.send(authors);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
