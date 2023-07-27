import React, { useState, useEffect } from "react";
import { Toolbar } from "./Toolbar";
import fuzzysort from "fuzzysort";
import { makeHighestTarget } from "./utils";
import { Box } from "@mui/system";
import { Node, OldNode } from "./Node";
import { dispatchCopy } from "./CurrentSelection";
import { debounce } from "lodash";
import { Results } from "./Results";

function App({ files }: { files: string[] }) {
  const [search, setSearch] = useState("");

  const results = search
    ? fuzzysort.go(search, files).map((f) => f.target)
    : files;
  const targets = makeHighestTarget(results);

  const onChange = React.useRef(
    debounce((v: string) => setSearch(v), 300)
  ).current;

  useEffect(() => {
    const r = targets[0];
    if (!r) return;
    dispatchCopy(r);
  });

  return (
    <>
      <Toolbar search={search} setSearch={onChange} />
      <Results targets={targets} files={files} />
      <Box
        sx={{
          padding: "1em",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {targets.map((f, i) => (
          <Node key={i} file={f} filenames={files} root={true} />
        ))}
      </Box>
    </>
  );
}

export default App;
