"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CONTRACT_ADDRESS_DIR = "./utils/";
function ensureDirectoryExistence(filePath) {
    var dirname = path_1.default.dirname(filePath);
    if (fs_1.default.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs_1.default.mkdirSync(dirname);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const broadcastFiles = fs_1.default.readdirSync("./broadcast/DeployFactory.s.sol");
        const addresses = {};
        for (const chainId of broadcastFiles) {
            const runJsonFile = fs_1.default.readFileSync("./broadcast/DeployFactory.s.sol/" + chainId + "/run-latest.json", "utf-8");
            const runFile = JSON.parse(runJsonFile);
            const currentAddresses = {};
            for (const transaction of runFile.transactions) {
                if (transaction.transactionType === "CREATE") {
                    currentAddresses[transaction.contractName] =
                        transaction.contractAddress;
                }
            }
            addresses[chainId] = currentAddresses;
            addresses[chainId] = Object.assign({}, addresses[chainId]);
        }
        console.log(addresses);
        const addressFile = path_1.default.join(CONTRACT_ADDRESS_DIR, "contract-address.json");
        console.log(addressFile);
        ensureDirectoryExistence(addressFile);
        fs_1.default.writeFileSync(addressFile, JSON.stringify(addresses, null, 2));
    });
}
main();
//# sourceMappingURL=GenerateContractAddress.js.map