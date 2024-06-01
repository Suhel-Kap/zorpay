import fs from "fs";
import path from "path";

const CONTRACT_ADDRESS_DIR = "../Zorpay/src/utils/contractAddresses";

function ensureDirectoryExistence(filePath: string) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

async function main() {
  const broadcastFiles = fs.readdirSync("./broadcast/DeployFactory.s.sol");
  const addresses: Record<string, Record<string, string>> = {};
  for (const chainId of broadcastFiles) {
    const runJsonFile = fs.readFileSync(
      "./broadcast/DeployFactory.s.sol/" + chainId + "/run-latest.json",
      "utf-8",
    );
    const runFile = JSON.parse(runJsonFile);
    const currentAddresses: Record<string, string> = {};
    for (const transaction of runFile.transactions) {
      if (transaction.transactionType === "CREATE") {
        currentAddresses[transaction.contractName] =
          transaction.contractAddress;
      }
    }
    addresses[chainId] = currentAddresses;
    addresses[chainId] = {
      ...addresses[chainId],
    };
  }
  console.log(addresses);
  const addressFile = path.join(CONTRACT_ADDRESS_DIR, "contract-address.json");
  console.log(addressFile);

  ensureDirectoryExistence(addressFile);

  fs.writeFileSync(addressFile, JSON.stringify(addresses, null, 2));
}

main();
