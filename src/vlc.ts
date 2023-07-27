import { Request, Response } from "express";
import { listFiles } from "./utils";

const vlcTrackURL = (host: string, file: string) =>
  encodeURI(`${host}/raw/${file}`);

const vlcPlaylistTrack = (host: string) => (file: string, i: number) =>
  `<track>
<location>${vlcTrackURL(host, file)}</location>
<title>${file}</title>
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
  const path = `${root}/${source}`;
  const files = listFiles(root, path);
  res.send(vlcPlaylistContent(req.headers.host, source, files));
};
