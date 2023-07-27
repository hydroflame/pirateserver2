import { OldNode } from "./Node";
import { Box } from "@mui/system";

interface IProps {
  targets: string[];
  files: string[];
}
export const Results = ({ targets, files }: IProps) => (
  <Box
    sx={{
      padding: "1em",
    }}
  >
    {targets.map((f, i) => (
      <OldNode key={i} file={f} filenames={files} root={true} />
    ))}
  </Box>
);
