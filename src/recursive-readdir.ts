import fs from "fs";
import path from "path";
import { promisify } from "util";
const readdir = promisify(fs.readdir);

const recursiveReaddir = async (rootPath: string, callback: (path: string) => void) => {
  const entries = await readdir(rootPath, { withFileTypes: true });
  for (const entry of entries) {
    const pathname = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      await recursiveReaddir(pathname, callback);
    } else {
      callback(pathname);
    }
  }
};

export default recursiveReaddir;
