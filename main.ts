// deno-lint-ignore-file no-import-prefix ban-unused-ignore
// import { parse, resolve } from "jsr:@std/path@1.1.6";
import {resolve, parse} from "jsr:@std/path@1.1.6";

const arg = Deno.args[0] ?? "";
const parsed = parse(arg);

const home = Deno.env.get("HOME");
if(!home){
    console.log("no HOME env varible")
    Deno.exit();
}

const downloadsDir = Deno.realPathSync(resolve(home, "storage", "downloads"));

if([".zip", ".rar", ".7z"].includes(parsed.ext)){
    const newFolder = resolve(parsed.dir, parsed.name);
    new Deno.Command("7z", { args: [ "x", `-o${newFolder}`, arg, "-aos" ], stderr: "null", stdin: "null", stdout: "null" }).spawn();
    try {
        Deno.removeSync(resolve(downloadsDir, parsed.base));
    } catch (err: any) {
        console.log(err);
        console.log("the archive was not in download so it was not removed");
        confirm("ok?");
    }
}

console.log("file should be .zip, .rar or .7z");