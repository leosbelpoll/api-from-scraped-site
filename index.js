const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");

const app = express();
const port = process.env.PORT || 3000;

const baseUrl = process.env.BASE_URL || "https://quotes.toscrape.com";

const getDom = async (url = "/") => {
  const { data } = await axios.get(baseUrl + url);
  const dom = new jsdom.JSDOM(data);

  return dom.window.document;
};

app.get("/", async (req, res) => {
  const dom = await getDom();

  res.send(dom.querySelector(".quote").textContent);
});

app.get("/authors", async (req, res) => {
  const authors = [];
  const dom = await getDom();
  
  const authors_elements = await dom.querySelectorAll("small.author");

  for (const element of authors_elements) {    
    const author_url = element.nextElementSibling.getAttribute("href");
    const author_html_dom = await getDom(author_url);
    const bornDate  = author_html_dom.querySelector(".author-born-date").textContent
    const bornLocation  = author_html_dom.querySelector(".author-born-location").textContent
    const description  = author_html_dom.querySelector("div.author-description").textContent

    authors.push(
      {
        "name": element.textContent,
        "biography": description,
        "birthdate": bornDate,
        "location": bornLocation
      });
  }
  res.send(authors);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
