# vscode-nomo

Visual Studio Code syntax highlighting and language-server client for the
early-preview [Nomo language](https://www.nomo-lang.org).

## Status and compatibility

This extension is a thin editor integration. The TextMate grammar provides
baseline highlighting; diagnostics, completion, hover, signatures, symbols,
navigation, rename, code actions, formatting, semantic tokens, and inlay hints
come from an external
[`nomo-lsp`](https://github.com/nomo-lang/nomo-lsp) process.

The current packaged extension is prerelease
[`v0.0.0-20260721120555`](https://github.com/nomo-lang/vscode-nomo/releases/tag/v0.0.0-20260721120555).
The current `main` syntax contract is commit
[`23f3bf0`](https://github.com/nomo-lang/vscode-nomo/commit/23f3bf067d5d2aef2434c9fed744585755821dbe)
and is verified with language-server commit
[`708427d`](https://github.com/nomo-lang/nomo-lsp/commit/708427d27891a06d0a9e20b542784fdf01622244)
and compiler commit
[`6acff2b`](https://github.com/nomo-lang/nomo/commit/6acff2bba0113efa3d49254ec2b9c72e1d442b33).
Those `main` commits contain canonical module-root and implicit-void support but
are newer than the packaged timestamp release.

Nomo has no stable `v0.1.0` release. Pin matching release tags or the documented
commit chain rather than mixing arbitrary snapshots.

## Install

Download `vscode-nomo-<version>.vsix` from a
[GitHub release](https://github.com/nomo-lang/vscode-nomo/releases), then use
**Extensions: Install from VSIX** or:

```sh
code --install-extension vscode-nomo-0.0.0-20260721120555.vsix
```

Install the matching `nomo-lsp` release archive, extract it, and put the
executable on `PATH`. To use the current source contract instead:

```sh
git clone https://github.com/nomo-lang/nomo-lsp.git
cd nomo-lsp
git checkout 708427d27891a06d0a9e20b542784fdf01622244
cargo install --path . --locked
```

Set `nomo.lsp.path` when the server is not discoverable as `nomo-lsp` on
`PATH`.

## Quick verification

Open a project created by the matching compiler:

```sh
nomo new hello-world
cd hello-world
code .
```

`src/main.nomo` should begin with:

```nomo
package hello_world

import std.io

fn main() {
    io.println("Hello, Nomo")
}
```

The TextMate grammar recognizes canonical no-return declarations, keeps
`task fn(string) -> void` as a fully typed callable, and treats `task` as a
keyword only in callable-type context. Compiler-backed services additionally
validate package roots derived from `nomo.toml`.

## Features

- TextMate highlighting for Nomo declarations, expressions, `suspend`, and
  contextual task callable types;
- real-time compiler diagnostics with severity mapping;
- keyword, import-path, and semantic-symbol completion;
- hover, signature help, document/workspace symbols, definition, references,
  and rename;
- quick fixes for compiler suggestions, missing imports, and module/package
  mismatch diagnostics;
- type and parameter-name inlay hints;
- formatting and semantic highlighting through the language server.

Capabilities depend on the configured server revision. The extension does not
embed the compiler or language server.

## Configuration

| Setting | Default | Meaning |
| --- | --- | --- |
| `nomo.lsp.path` | `nomo-lsp` | Executable name or absolute path for the language server |
| `nomo.trace.server` | `off` | LSP traffic tracing: `off`, `messages`, or `verbose` |

Use verbose tracing only for debugging; it may contain source text and project
paths.

## Development and validation

Requires Node.js 24:

```sh
npm ci
npm test
npm run build
npm run package
```

The test suite checks server-launch configuration and TextMate contracts,
including implicit void, callable return types, `Result<void, E>`, `suspend`,
and contextual `task`. CI builds the extension and packages an installable
universal VSIX.

Press `F5` in VS Code after `npm run build` to launch an Extension Development
Host.

## Release

A signed `v<package.json version>` tag drives the release workflow. It tests and
packages the same VSIX, creates the GitHub release artifact, and may publish to
Visual Studio Marketplace and Open VSX when repository credentials are
configured. Missing store credentials do not invalidate the GitHub VSIX.

Timestamp `v0.0.0-<timestamp>` tags are prereleases. A stable marketplace
listing does not imply a stable Nomo language release.

## Boundaries and authority

- TextMate highlighting is lexical and may accept incomplete source.
- Semantic behavior and diagnostics come from the configured `nomo-lsp`.
- Compiler and LSP versions must be reviewed as a pair.
- Internal editor tests do not establish production readiness or broad VS Code
  platform support.

For normative syntax, consult the
[English specification](https://github.com/nomo-lang/rfcs/blob/main/en/SPEC.md),
[中文规范](https://github.com/nomo-lang/rfcs/blob/main/zh-CN/SPEC.md),
[RFC 0021](https://github.com/nomo-lang/rfcs/blob/main/en/0021-module-system-imports.md),
and
[RFC 0041](https://github.com/nomo-lang/rfcs/blob/main/en/0041-implicit-void-return-omission.md).
Contributions follow the
[shared guide](https://github.com/nomo-lang/.github/blob/main/CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).
