import { Request, Response } from "express";
import { listFiles } from "./utils";

const vlcTrackURL = (host: string, file: string) =>
  encodeURI(`http://${host}/raw/${file}`);

const stripPath = (f: string) =>
  f.lastIndexOf("/") !== -1 ? f.slice(f.lastIndexOf("/") + 1) : f;
const stripExt = (f: string) =>
  f.lastIndexOf(".") !== -1 ? f.slice(0, f.lastIndexOf(".")) : f;

const vlcTitle = (file: string) => stripExt(stripPath(file));

const vlcPlaylistTrack = (host: string) => (file: string, i: number) =>
  `<track>
<location>${vlcTrackURL(host, file)}</location>
<title>${vlcTitle(file)}</title>
<extension application="http://www.videolan.org/vlc/playlist/0">
    <vlc:id>${i}</vlc:id>
    <vlc:option>network-caching=1000</vlc:option>
</extension>
</track>`;

const vlcPlaylistContent = (host: string, name: string, files: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1"><title>${name}</title><trackList>
    ${files.map(vlcPlaylistTrack(host)).join("")}
</trackList><extension application="http://www.videolan.org/vlc/playlist/0">
    ${files.map((_, i) => `<vlc:item tid="${i}"/>`).join("")}
</extension></playlist>`;

export const vlcHandler = (root: string) => (req: Request, res: Response) => {
  const source = String(req.query["source"]);
  const filepath = `${root}/${source}`;
  const files = listFiles(root, filepath);
  res.setHeader("Content-Type", "application/xspf+xml");
  res.send(vlcPlaylistContent(req.headers.host, source, files));
};
