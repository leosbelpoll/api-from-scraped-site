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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
