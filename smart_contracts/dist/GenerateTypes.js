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
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const typechain_1 = require("typechain");
const TYPES_DIR = "./utils/types";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = process.cwd();
        const files = (yield (0, glob_1.glob)("./src/**/*.sol")).map((str) => path_1.default.basename(str));
        const allFiles = files.map((file) => "./out/" + file + "/" + file.replace(".sol", "") + ".json");
        const result = yield (0, typechain_1.runTypeChain)({
            cwd,
            filesToProcess: allFiles,
            allFiles,
            outDir: TYPES_DIR,
            target: "ethers-v5", // "ethers-v6",
        });
        console.log(result);
    });
}
main();
//# sourceMappingURL=GenerateTypes.js.map