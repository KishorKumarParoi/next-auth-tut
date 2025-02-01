import path from "path";

export const log = (...args: any[]) => {
  const stack = new Error().stack;
  if (stack) {
    const stackLines = stack.split("\n");
    // Filter out lines that contain '.next' or 'node_modules'
    const filteredStackLines = stackLines.filter(
      (line) => !line.includes(".next") && !line.includes("node_modules")
    );
    if (filteredStackLines.length > 2) {
      const callerLine = filteredStackLines[2].trim();
      const match =
        callerLine.match(/at (.+) \((.+):(\d+):(\d+)\)/) ||
        callerLine.match(/at (.+):(\d+):(\d+)/);
      if (match) {
        const filePath = match[2] || match[1];
        const fileName = path.basename(filePath);
        const lineNumber = match[3] || match[2];
        console.log(`[${fileName}:${lineNumber}]`, ...args);
        return;
      }
    }
  }
  console.log(...args);
};
