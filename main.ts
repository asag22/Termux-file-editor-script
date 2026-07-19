// deno-lint-ignore-file no-import-prefix
import { parse, resolve } from "jsr:@std/path@1.1.6";

const arg = Deno.args[0] ?? "";
const parsed = parse(arg);

if([".zip", ".rar", ".7z"].includes(parsed.ext)){
    const newFolder = resolve(parsed.dir, parsed.name);
    new Deno.Command("7z", { args: [ "x", `-o${newFolder}`, arg ] }).spawn();
}

console.log("file should be .zip, .rar or .7z");
