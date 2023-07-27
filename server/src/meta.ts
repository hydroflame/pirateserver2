import { Request, Response } from "express";
import fuzzysort from "fuzzysort";
import fs from "fs";
import path from "path";

interface IMDBImage {
  height: number;
  imageUrl: string;
  width: number;
}

interface IMDBSuggestion {
  i: IMDBImage;
  l: string;
}

interface IMDBSuggestionResponse {
  d: IMDBSuggestion[];
}

const getThumbnail = async (filepath: string, q: string) => {
  const url = `https://v3.sg.media-imdb.com/suggestion/x/${q}.json`;
  const response = await fetch(url);
  const content: IMDBSuggestionResponse = await response.json();
  const searchResults = fuzzysort.go(
    q,
    content.d.map((i) => i.l)
  );
  const match = content.d.find((i) => i.l === searchResults[0].target);
  const imageFetch = await fetch(
    match.i.imageUrl.replace("._V1_.jpg", "._V1_FMjpg_UY400_.jpg")
  );
  const stream = fs.createWriteStream(filepath);
  const buffer = Buffer.from(await imageFetch.arrayBuffer());
  stream.write(buffer);
};

export const meta = async (req: Request, res: Response) => {
  const q = String(req.query["q"]);
  const filepath = path.join(__dirname, "meta", `${q}.jpg`);
  if (!fs.existsSync(filepath)) {
    await getThumbnail(filepath, q);
  }
  res.sendFile(filepath);
};
