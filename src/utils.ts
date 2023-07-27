import * as fs from "fs";

export const listFiles = (root: string, path: string): string[] => {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const paths = fs.readdirSync(path);
    return paths.map((p) => listFiles(root, `${path}/${p}`)).flat();
  } else if (videoExts.some((ext) => path.endsWith(ext))) {
    return [path.slice(root.length + 1)];
  }
  return [];
};

const videoExts = [
  ".webm",
  ".mkv",
  ".flv",
  ".flv",
  ".vob",
  ".vob",
  ".ogv",
  ".ogg",
  ".drc",
  ".gif",
  ".gifv",
  ".g",
  ".webm",
  ".gifv",
  ".mng",
  ".avi",
  ".MTS",
  ".M2TS",
  ".mov",
  ".qt",
  ".wmv",
  ".net",
  ".yuv",
  ".rm",
  ".rmvb",
  ".asf",
  ".amv",
  ".mp4",
  ".m4p",
  ".m4v",
  ".mpg",
  ".mp2",
  ".mpeg",
  ".mpe",
  ".mpv",
  ".mpg",
  ".mpeg",
  ".m2v",
  ".m4v",
  ".svi",
  ".3gp",
  ".3g2",
  ".mxf",
  ".roq",
  ".nsv",
  ".flv",
  ".f4v",
  ".f4p",
  ".f4a",
  ".f4b",
];
