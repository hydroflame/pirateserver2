import * as express from "express";
import * as fs from "fs";
import { vlcHandler } from "./vlc";
import { listFiles } from "./utils";
const app = express();
const port = 3000;
const root = "root";

// app.use("/static/", express.static(root));
app.use("/raw/", express.static(root));

app.get("/api/files", (req, res) => {
  const files = listFiles(root, root).map((f: string) =>
    f.slice(root.length + 1)
  );
  res.send(files);
});

app.get("/vlc/", vlcHandler(root));

app.listen(port, () => console.log("OK"));
