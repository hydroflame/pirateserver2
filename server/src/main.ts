import express from "express";
import cors from "cors";
import { vlcHandler } from "./vlc";
import { listFiles } from "./utils";
import { meta } from "./meta";
const app = express();
const port = 9000;
const root = "root";
app.use(cors());
// app.use("/static/", express.static(root));
app.use("/raw/", express.static(root));

app.get("/api/files", (_req, res) => {
  const files = listFiles(root, root);
  res.send(files);
});

app.get("/api/meta", meta);

app.get("/vlc", vlcHandler(root));

app.listen(port, () => console.log("OK"));
