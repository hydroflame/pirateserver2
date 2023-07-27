import { Typography } from "@mui/material";
import React, { useState } from "react";
import { dispatchCopy } from "./CurrentSelection";
import { makeHighestTarget } from "./utils";
import { config } from "./config";

interface IProps {
  file: string;
  filenames: string[];
  root?: boolean;
}
export const Node = ({ file, filenames, root }: IProps): React.ReactElement => {
  const hasThumbnail = !file.includes("/") && !file.startsWith("movies");
  const children = filenames.filter((f) => f.startsWith(file + "/"));
  return (
    <>
      {hasThumbnail && <img src={`http://${config.host}/api/meta?q=${file}`} />}
      {/* {children.length ? (
        <FolderNode file={file} filenames={children} root={root} />
      ) : (
        <FileNode file={file} filenames={filenames} root={root} />
      )} */}
    </>
  );
};

export const OldNode = ({
  file,
  filenames,
  root,
}: IProps): React.ReactElement => {
  const children = filenames.filter((f) => f.startsWith(file + "/"));
  return children.length ? (
    <FolderNode file={file} filenames={children} root={root} />
  ) : (
    <FileNode file={file} filenames={filenames} root={root} />
  );
};

const FileNode = ({ file, root }: IProps): React.ReactElement => {
  const [isHovering, setIsHovering] = useState(false);

  const onClick = () => {
    dispatchCopy(file);
  };
  const title = root ? file : file.slice(file.lastIndexOf("/") + 1);
  return (
    <Typography
      sx={{ background: isHovering ? "green" : "" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {title}
    </Typography>
  );
};

const Summary = ({
  file,
  root,
  onClick,
}: IProps & JSX.IntrinsicElements["summary"]): React.ReactElement => {
  const [isHovering, setIsHovering] = useState(false);
  const title = root ? file : file.slice(file.lastIndexOf("/") + 1);
  const style = {
    color: "#add8e6",
    listStyle: "none",
    cursor: "default",
    background: isHovering ? "green" : "none",
  };
  return (
    <summary
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={style}
      onClick={onClick}
    >
      <Typography>{title}/</Typography>
    </summary>
  );
};

const FolderNode = ({ file, filenames, root }: IProps): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const targets = makeHighestTarget(filenames);

  const onClick = (event: any) => {
    event.preventDefault();
    setOpen((o) => !o);
    dispatchCopy(file);
  };
  const title = root ? file : file.slice(file.lastIndexOf("/") + 1);
  return (
    <details open={open}>
      <Summary
        onClick={onClick}
        file={file}
        root={root}
        filenames={filenames}
      />

      <fieldset style={{ border: "none" }}>
        {open &&
          targets.map((c, i) => (
            <Node key={i} file={c} filenames={filenames} />
          ))}
      </fieldset>
    </details>
  );
};
