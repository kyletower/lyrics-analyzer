// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getURL } from 'next/dist/shared/lib/utils';
import fetch from 'node-fetch';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// const API_CLIENT_ACCESS_TOKEN = process.env;
const API_CLIENT_ACCESS_TOKEN =
  '2BFVGS1aXQXiTmuahLb1PbnfhksNqh5aRPGJ-CJR_8vfzMVhnCFb0s4qemBrvQq7';
const API_SEARCH_URL = `https://api.genius.com/search?q=`;

export default async function handler(req, res) {
  const { q } = req.query;
  const response = await fetch(`${API_SEARCH_URL}${q}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + API_CLIENT_ACCESS_TOKEN },
  });

  const data = await response.json();
  getURLs(data);
  res.status(200).json(data);
}

const getURLs = (data) => {
  const hits = data.response.hits;
  // limit hits to 4
  if (hits.length > 4) {
    hits.splice(4, hits.length - 4);
  }
  const urls = hits.map((hit) => hit.result.url);
  console.log(urls);
  urls.forEach((url) => {
    JSDOM.fromURL(url).then((dom) => {
      // const domSerialized = dom.serialize();
      // div id="lyrics-root"
      // class="Lyrics__Container-sc-1ynbvzw-6 lgZgEN"
      const lyricsDiv = dom.window.document.querySelector('#lyrics-root');
      const lyricsDivAsString = lyricsDiv.innerHTML;
      const lyricsDivAsStringModifed = lyricsDivAsString.replaceAll(
        `<br>`,
        `\n`
      );

      lyricsDiv.innerHTML = lyricsDivAsStringModifed;
      const lyricsText = lyricsDiv.textContent;
      console.log(lyricsText);
    });
  });
};

// const getURL = (data) => {
//   const hit = data.response.hits[0];
//   const url = hit.result.url;
//   console.log(url);
//   //   { pretendToBeVisual: true }
//   JSDOM.fromURL(url).then((dom) => {
//     // const domSerialized = dom.serialize();
//     // div id="lyrics-root"
//     // class="Lyrics__Container-sc-1ynbvzw-6 lgZgEN"
//     const lyricsText = dom.window.document.querySelector('#lyrics-root');
//     console.log(lyricsText.textContent);
//   });
// };
