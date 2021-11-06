const express = require("express");
const axios = require("axios");
const jsdom = require("jsdom");

const app = express();
const port = process.env.PORT || 3000;

const GLOBAL = {
  quotes: [
    {
      "author": "Albert Einstein",
      "text": "Any fool can know. The point is to understand.",
      "tags": [
        "knowledge",
        "learning",
        "understanding",
        "wisdom"
      ]
    },
    {
      "author": "Albert",
      "text": "Any fool can know. The point is to understand.",
      "tags": [
        "knowledge",
      ]
    }
  ],
  authors: [{
    "name": "Albert Einstein",
    "biography": "\n        In 1879, Albert Einstein was born in Ulm, Germany. He completed his Ph.D. at the University of Zurich by 1909. His 1905 paper explaining the photoelectric effect, the basis of electronics, earned him the Nobel Prize in 1921. His first paper on Special Relativity Theory, also published in 1905, changed the world. After the rise of the Nazi party, Einstein made Princeton his permanent home, becoming a U.S. citizen in 1940. Einstein, a pacifist during World War I, stayed a firm proponent of social justice and responsibility. He chaired the Emergency Committee of Atomic Scientists, which organized to alert the public to the dangers of atomic warfare.At a symposium, he advised: \"In their struggle for the ethical good, teachers of religion must have the stature to give up the doctrine of a personal God, that is, give up that source of fear and hope which in the past placed such vast power in the hands of priests. In their labors they will have to avail themselves of those forces which are capable of cultivating the Good, the True, and the Beautiful in humanity itself. This is, to be sure a more difficult but an incomparably more worthy task . . . \" (\"Science, Philosophy and Religion, A Symposium,\" published by the Conference on Science, Philosophy and Religion in their Relation to the Democratic Way of Life, Inc., New York, 1941). In a letter to philosopher Eric Gutkind, dated Jan. 3, 1954, Einstein stated: \"The word god is for me nothing more than the expression and product of human weaknesses, the Bible a collection of honorable, but still primitive legends which are nevertheless pretty childish. No interpretation no matter how subtle can (for me) change this,\" (The Guardian, \"Childish superstition: Einstein's letter makes view of religion relatively clear,\" by James Randerson, May 13, 2008). D. 1955.While best known for his mass–energy equivalence formula E = mc2 (which has been dubbed \"the world's most famous equation\"), he received the 1921 Nobel Prize in Physics \"for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect\". The latter was pivotal in establishing quantum theory.Einstein thought that Newtonion mechanics was no longer enough to reconcile the laws of classical mechanics with the laws of the electromagnetic field. This led to the development of his special theory of relativity. He realized, however, that the principle of relativity could also be extended to gravitational fields, and with his subsequent theory of gravitation in 1916, he published a paper on the general theory of relativity. He continued to deal with problems of statistical mechanics and quantum theory, which led to his explanations of particle theory and the motion of molecules. He also investigated the thermal properties of light which laid the foundation of the photon theory of light.He was visiting the United States when Adolf Hitler came to power in 1933 and did not go back to Germany. On the eve of World War II, he endorsed a letter to President Franklin D. Roosevelt alerting him to the potential development of \"extremely powerful bombs of a new type\" and recommending that the U.S. begin similar research. This eventually led to what would become the Manhattan Project. Einstein supported defending the Allied forces, but largely denounced the idea of using the newly discovered nuclear fission as a weapon. Later, with Bertrand Russell, Einstein signed the Russell–Einstein Manifesto, which highlighted the danger of nuclear weapons. Einstein was affiliated with the Institute for Advanced Study in Princeton, New Jersey, until his death in 1955.His great intellectual achievements and originality have made the word \"Einstein\" synonymous with genius.More: http://en.wikipedia.org/wiki/Albert_E...http://www.nobelprize.org/nobel_prize...    \n    ",
    "birthdate": "March 14, 1879",
    "location": "in Ulm, Germany"
},
{
    "name": "J.K. Rowling",
    "biography": "\n        See also: Robert GalbraithAlthough she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling. She calls herself Jo and has said, \"No one ever called me 'Joanne' when I was young, unless they were angry.\" Following her marriage, she has sometimes used the name Joanne Murray when conducting personal business. During the Leveson Inquiry she gave evidence under the name of Joanne Kathleen Rowling. In a 2012 interview, Rowling noted that she no longer cared that people pronounced her name incorrectly.Rowling was born to Peter James Rowling, a Rolls-Royce aircraft engineer, and Anne Rowling (née Volant), on 31 July 1965 in Yate, Gloucestershire, England, 10 miles (16 km) northeast of Bristol. Her mother Anne was half-French and half-Scottish. Her parents first met on a train departing from King's Cross Station bound for Arbroath in 1964. They married on 14 March 1965. Her mother's maternal grandfather, Dugald Campbell, was born in Lamlash on the Isle of Arran. Her mother's paternal grandfather, Louis Volant, was awarded the Croix de Guerre for exceptional bravery in defending the village of Courcelles-le-Comte during the First World War.Rowling's sister Dianne was born at their home when Rowling was 23 months old. The family moved to the nearby village Winterbourne when Rowling was four. She attended St Michael's Primary School, a school founded by abolitionist William Wilberforce and education reformer Hannah More. Her headmaster at St Michael's, Alfred Dunn, has been suggested as the inspiration for the Harry Potter headmaster Albus Dumbledore.As a child, Rowling often wrote fantasy stories, which she would usually then read to her sister. She recalls that: \"I can still remember me telling her a story in which she fell down a rabbit hole and was fed strawberries by the rabbit family inside it. Certainly the first story I ever wrote down (when I was five or six) was about a rabbit called Rabbit. He got the measles and was visited by his friends, including a giant bee called Miss Bee.\" At the age of nine, Rowling moved to Church Cottage in the Gloucestershire village of Tutshill, close to Chepstow, Wales. When she was a young teenager, her great aunt, who Rowling said \"taught classics and approved of a thirst for knowledge, even of a questionable kind,\" gave her a very old copy of Jessica Mitford's autobiography, Hons and Rebels. Mitford became Rowling's heroine, and Rowling subsequently read all of her books.Rowling has said of her teenage years, in an interview with The New Yorker, \"I wasn’t particularly happy. I think it’s a dreadful time of life.\" She had a difficult homelife; her mother was ill and she had a difficult relationship with her father (she is no longer on speaking terms with him). She attended secondary school at Wyedean School and College, where her mother had worked as a technician in the science department. Rowling said of her adolescence, \"Hermione [a bookish, know-it-all Harry Potter character] is loosely based on me. She's a caricature of me when I was eleven, which I'm not particularly proud of.\" Steve Eddy, who taught Rowling English when she first arrived, remembers her as \"not exceptional\" but \"one of a group of girls who were bright, and quite good at English.\" Sean Harris, her best friend in the Upper Sixth owned a turquoise Ford Anglia, which she says inspired the one in her books.    \n    ",
    "birthdate": "July 31, 1965",
    "location": "in Yate, South Gloucestershire, England, The United Kingdom"
},]
}

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

app.get("/quotes", (req, res) => {
  const author = req.query.author; 
  const tag = req.query.tag;
  if(author !== undefined) {
    const quotes = GLOBAL.quotes.filter(q => q.author == author);
    res.send({
      data : quotes
    });
  } else if(tag !== undefined) {
    const quotes = GLOBAL.quotes.filter(q => q.tags.includes(tag));
    res.send({
      data : quotes
    });
  }
   else {
    res.send({
      data : GLOBAL.quotes
    });
  }

  res.send(dom.querySelector(".quote").textContent);
});

app.get("/authors", async (req, res) => {
  const name = req.query.name; 
  if (name === undefined)  {
    res.send({
      data : GLOBAL.authors
    });
  }
 else {
  const author = GLOBAL.authors.find(a => a.name == name)[0];
  res.send({
    data : author
  });
 }
});

app.get("/authors1", async (req, res) => {
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
