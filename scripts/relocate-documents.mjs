// Relocate src/documents/** -> src/module/documents/** (mirror runtime module/documents/),
// nesting src/documents/actor.d.mts -> src/module/documents/actor/actor.d.mts.
// Rewrites every relative .mjs import specifier repo-wide by resolving it from each importer's
// OLD location and re-expressing it relative to its NEW location (handles imports into / out of /
// within the moved subtree uniformly). Dry-run unless APPLY=1.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const APPLY = process.env.APPLY === "1";

const allFiles = execSync('find src -name "*.d.mts"', { encoding: "utf8" })
  .trim().split("\n").filter(Boolean).map((p) => path.join(ROOT, p));

// Build move map (oldAbs -> newAbs). Only files under src/documents/ move.
const DOCS = path.join(SRC, "documents");
const MODDOCS = path.join(SRC, "module", "documents");
const ACTOR_OLD = path.join(DOCS, "actor.d.mts");
const ACTOR_NEW = path.join(MODDOCS, "actor", "actor.d.mts");

const moveMap = new Map();
for (const f of allFiles) {
  if (f === ACTOR_OLD) { moveMap.set(f, ACTOR_NEW); continue; }
  if (f.startsWith(DOCS + path.sep)) {
    moveMap.set(f, path.join(MODDOCS, path.relative(DOCS, f)));
  }
}
const newLoc = (f) => moveMap.get(f) ?? f;

// .mjs specifier rewrite: resolve from old importer dir, map target, reexpress from new importer dir.
const SPEC_RE = /(['"])(\.\.?\/[^'"]*\.mjs)\1/g;
function rewrite(content, oldAbs) {
  const newAbs = newLoc(oldAbs);
  let count = 0;
  const out = content.replace(SPEC_RE, (m, q, spec) => {
    const targetOldMjs = path.resolve(path.dirname(oldAbs), spec);
    const targetOldDmts = targetOldMjs.replace(/\.mjs$/, ".d.mts");
    const targetNewDmts = newLoc(targetOldDmts);
    let rel = path.relative(path.dirname(newAbs), targetNewDmts).replace(/\.d\.mts$/, ".mjs");
    if (!rel.startsWith(".")) rel = "./" + rel;
    rel = rel.split(path.sep).join("/");
    if (rel !== spec) count++;
    return q + rel + q;
  });
  return { out, count };
}

let filesChanged = 0, specsRewritten = 0, moved = 0;
const examples = [];
const writes = [];
for (const f of allFiles) {
  const content = fs.readFileSync(f, "utf8");
  const { out, count } = rewrite(content, f);
  const dest = newLoc(f);
  if (dest !== f) moved++;
  if (count > 0) { filesChanged++; specsRewritten += count; }
  if (count > 0 && examples.length < 8) {
    const before = content.match(SPEC_RE)?.slice(0, 2) || [];
    const after = out.match(SPEC_RE)?.slice(0, 2) || [];
    examples.push(`  ${path.relative(ROOT, f)} -> ${path.relative(ROOT, dest)}\n      ${before.join(", ")}  =>  ${after.join(", ")}`);
  }
  writes.push({ src: f, dest, out });
}

console.log(`files moved: ${moved} | files with rewritten specifiers: ${filesChanged} | total specifiers rewritten: ${specsRewritten}`);
console.log("examples:\n" + examples.join("\n"));

if (!APPLY) { console.log("\nDRY RUN (set APPLY=1 to apply)"); process.exit(0); }

for (const { src, dest, out } of writes) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
  if (dest !== src) fs.rmSync(src);
}
// prune empty src/documents tree
function prune(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir)) { const p = path.join(dir, e); if (fs.statSync(p).isDirectory()) prune(p); }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}
prune(DOCS);
console.log("APPLIED.");
