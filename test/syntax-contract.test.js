"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const grammar = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "syntaxes", "nomo.tmLanguage.json"),
    "utf8",
  ),
);

function pattern(name) {
  return grammar.repository[name].patterns;
}

test("TextMate grammar recognizes canonical implicit-void declarations", () => {
  const declaration = new RegExp(
    pattern("keywords").find(
      (entry) =>
        entry.name === "keyword.declaration.nomo" &&
        entry.match.includes("package"),
    ).match,
  );
  const functionDeclaration = new RegExp(pattern("functions")[0].match);

  assert.equal(declaration.exec("suspend fn main()")[0], "suspend");
  assert.equal(functionDeclaration.exec("fn main()")[2], "main");
  assert.equal(functionDeclaration.exec("fn close(self)")[2], "close");
  assert.equal(functionDeclaration.exec("fn release(handle: i64)")[2], "release");
});

test("TextMate grammar keeps callable and Result void syntax visible", () => {
  const operator = new RegExp(pattern("operators")[0].match);
  const primitive = new RegExp(pattern("types")[0].match, "g");
  const taskCallable = new RegExp(pattern("keywords")[0].match);
  const source =
    "fn register(callback: task fn(string) -> void) -> Result<void, string>";

  assert.equal(taskCallable.exec(source)[0], "task");
  assert.equal(taskCallable.test("let task = worker"), false);
  assert.equal(operator.exec(source)[0], "->");
  assert.deepEqual(
    [...source.matchAll(primitive)].map((match) => match[0]),
    ["string", "void", "void", "string"],
  );
});
