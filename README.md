# vscode-nomo

VS Code support for the [Nomo](https://github.com/nomo-lang) programming language.

## Features

- Real-time diagnostics from the Nomo compiler
- Keyword, import path and semantic symbol completion
- Hover, document symbols, workspace symbols, go-to-definition, references and rename through `nomo-lsp`
- Quick-fix code actions for compiler suggestions, missing imports and module/package mismatches through `nomo-lsp`
- Inlay hints for inferred `let` binding types and same-file function/method parameter names through `nomo-lsp`
- Document formatting through `nomo-lsp`
- Syntax highlighting (TextMate grammar) plus semantic highlighting from the language server

All language intelligence is provided by the [`nomo-lsp`](https://github.com/nomo-lang/nomo-lsp) language server.

## Requirements

Install the language server archive for your platform from the
[`nomo-lsp` releases](https://github.com/nomo-lang/nomo-lsp/releases), extract
it, and place the executable on your `PATH`. To build it from source, clone
`nomo` and `nomo-lsp` as sibling repositories, then run:

```bash
cd ../nomo-lsp
cargo install --path .
```

Alternatively set `nomo.lsp.path` in your settings to the absolute path of the `nomo-lsp` binary.

## Install

Release builds attach an installable `vscode-nomo-<version>.vsix` file to the
matching GitHub release. Install it from the Extensions view with **Install from
VSIX**, or from a terminal:

```bash
code --install-extension vscode-nomo-0.1.0.vsix
```

Marketplace publication uses the extension identifier
`nomo-lang.vscode-nomo`. The release workflow publishes the same VSIX to the
Visual Studio Marketplace and Open VSX when a matching `v<version>` tag is
pushed and the repository has `VSCE_PAT` and `OVSX_PAT` secrets configured.
Missing store credentials skip only that publication; the GitHub release and
VSIX artifact still succeed.

## Configuration

- `nomo.lsp.path`: path to `nomo-lsp`; defaults to resolving `nomo-lsp` on
  `PATH`.
- `nomo.trace.server`: LSP traffic tracing level (`off`, `messages`, or
  `verbose`).

## Development

```bash
npm install
npm run build
# Press F5 in VS Code to launch an Extension Development Host,
# or package a .vsix:
npm run package
```

`npm run package` produces a universal VSIX. Publishing is tag-driven; a tag
must exactly match the `package.json` version, such as `v0.1.0`.
