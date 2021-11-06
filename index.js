const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");

const app = express();
const port = process.env.PORT || 3000;

const baseUrl = process.env.BASE_URL || "https://quotes.toscrape.com";

const data = { quotes: [], authors: [] };

const getDom = async (url = "/") => {
  const { data } = await axios.get(baseUrl + url);
  const dom = new jsdom.JSDOM(data);

  return dom.window.document;
};

const addQuotesAndAuthors = async (quotesDom) => {
  for (quoteDom of quotesDom) {
    const authorDom = quoteDom.querySelector("small.author");
    const authorName = authorDom.textContent;
    const tags = [];

    quoteDom.querySelectorAll(".tag").forEach((tag) => {
      tags.push(tag.textContent);
    });

    data.quotes.push({
      text: quoteDom.querySelector(".text").textContent?.trim().slice(0, 50),
      author: authorName,
      tags,
    });

    const authorUrl = authorDom.nextElementSibling.getAttribute("href");
    if (!data.authors.some((author) => author.url === authorUrl)) {
      const authorHtmlDom = await getDom(authorUrl);
      const bornDate =
        authorHtmlDom.querySelector(".author-born-date").textContent;
      const bornLocation = authorHtmlDom.querySelector(
        ".author-born-location"
      ).textContent;
      const description = authorHtmlDom.querySelector(
        "div.author-description"
      ).textContent;

      data.authors.push({
        name: authorDom.textContent,
        biography: description,
        birthdate: bornDate,
        location: bornLocation,
        url: authorUrl,
      });
    }
  }
};

const getInitialData = async () => {
  let dom = await getDom("/page/1");
  await addQuotesAndAuthors(dom.querySelectorAll(".quote"));
  for (let i = 2; dom.querySelector(".next"); i++) {
    dom = await getDom(`/page/${i}`);
    const quotesDom = dom.querySelectorAll(".quote");
    await addQuotesAndAuthors(quotesDom);
  }

  console.log("Data is ready");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

getInitialData();

app.get("/quotes", (req, res) => {
  const author = req.query.author;
  const tag = req.query.tag;
  let quotes;
  if (author !== undefined) {
    quotes = data.quotes.filter((q) => q.author == author);
    
  } else if (tag !== undefined) {
    quotes = data.quotes.filter((q) => q.tags.includes(tag));
  } else {
    quotes = data.quotes
  }

  return res.send({
    data: quotes,
    total: quotes.length
  });
});

app.get("/authors", async (req, res) => {
  const name = req.query.name;
  if (name === undefined) {
    return res.send({
      data: data.authors,
      total: data.authors.length
    });
  } else {
    const author = data.authors.find((a) => a.name == name)[0];
    return res.send({
      data: author,
    });
  }
});
