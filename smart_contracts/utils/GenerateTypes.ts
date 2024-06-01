import { glob } from "glob";
import path from "path";
import { runTypeChain } from "typechain";

const TYPES_DIR = "./utils/types";

async function main() {
  const cwd = process.cwd();
  const files = (await glob("./src/**/*.sol")).map((str: string) =>
    path.basename(str)
  );
  const allFiles = files.map(
    (file: string) => "./out/" + file + "/" + file.replace(".sol", "") + ".json"
  );

  const result = await runTypeChain({
    cwd,
    filesToProcess: allFiles,
    allFiles,
    outDir: TYPES_DIR,
    target: "ethers-v5", // "ethers-v6",
  });
  console.log(result);
}

main();
