// deno-lint-ignore-file no-import-prefix ban-unused-ignore
// import { parse, resolve } from "jsr:@std/path@1.1.6";
import * as path from "jsr:@std/path@1.1.6";

const arg = Deno.args[0] ?? "";
const parsed = path.parse(arg);

let storage = path.parse("~/storage/downloads");

console.log(storage.dir);
console.log(path.resolve(storage.dir));


if([".zip", ".rar", ".7z"].includes(parsed.ext)){
    const newFolder = path.resolve(parsed.dir, parsed.name);
    new Deno.Command("7z", { args: [ "x", `-o${newFolder}`, arg ] }).spawn();
}

console.log("file should be .zip, .rar or .7z");
