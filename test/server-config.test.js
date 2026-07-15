"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { resolveServerPath } = require("../dist-test/server-config.js");

test("resolves the language server command from configuration or PATH", () => {
  assert.equal(resolveServerPath(undefined), "nomo-lsp");
  assert.equal(resolveServerPath("   "), "nomo-lsp");
  assert.equal(resolveServerPath(" /opt/nomo/bin/nomo-lsp "), "/opt/nomo/bin/nomo-lsp");
});

test("keeps the VS Code language and server configuration contract aligned", () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
  );
  assert.deepEqual(manifest.activationEvents, ["onLanguage:nomo"]);
  assert.equal(manifest.contributes.languages[0].id, "nomo");
  assert.deepEqual(manifest.contributes.languages[0].extensions, [".nomo"]);
  assert.equal(manifest.contributes.configuration.properties["nomo.lsp.path"].default, "nomo-lsp");
});
