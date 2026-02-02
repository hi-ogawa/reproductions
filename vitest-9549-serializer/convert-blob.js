import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { parse as flattedParse } from "flatted";
import { stringify as devalueStringify } from "devalue";
import { stringify as ungapStringify } from "@ungap/structured-clone/json";

const INPUT_PATH = ".vitest-reports/blob.json";
const FLATTED_OUTPUT = "./fixtures/blob-flatted.json";
const DEVALUE_OUTPUT = "./fixtures/blob-devalue.json";
const UNGAP_OUTPUT = "./fixtures/blob-ungap.json";

// Copy original as blob-flatted.json (it's already in flatted format)
copyFileSync(INPUT_PATH, FLATTED_OUTPUT);
console.log(`Copied ${INPUT_PATH} -> ${FLATTED_OUTPUT}`);

// Parse flatted and serialize with devalue and ungap
const flattedJson = readFileSync(INPUT_PATH, "utf-8");
const data = flattedParse(flattedJson);

const devalueJson = devalueStringify(data);
writeFileSync(DEVALUE_OUTPUT, devalueJson);
console.log(`Converted ${INPUT_PATH} -> ${DEVALUE_OUTPUT}`);

const ungapJson = ungapStringify(data);
writeFileSync(UNGAP_OUTPUT, ungapJson);
console.log(`Converted ${INPUT_PATH} -> ${UNGAP_OUTPUT}`);

// Print file sizes for comparison
const flattedSize = readFileSync(FLATTED_OUTPUT).length;
const devalueSize = readFileSync(DEVALUE_OUTPUT).length;
const ungapSize = readFileSync(UNGAP_OUTPUT).length;
console.log(`\nFile sizes:`);
console.log(`  blob-flatted.json: ${(flattedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  blob-devalue.json: ${(devalueSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  blob-ungap.json:   ${(ungapSize / 1024 / 1024).toFixed(2)} MB`);
