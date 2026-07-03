# vscode-nomo

VS Code support for the [Nomo](https://github.com/nomo-lang) programming language.

## Features

- Real-time diagnostics from the Nomo compiler
- Keyword completion
- Hover, go-to-definition, references and rename through `nomo-lsp`
- Document formatting through `nomo-lsp`
- Syntax highlighting (TextMate grammar) plus semantic highlighting from the language server

All language intelligence is provided by the [`nomo-lsp`](https://github.com/nomo-lang/nomo-lsp) language server.

## Requirements

Build and install the language server so it is reachable on your `PATH`:

```bash
cd ../nomo-lsp
cargo install --path .
```

Alternatively set `nomo.lsp.path` in your settings to the absolute path of the `nomo-lsp` binary.

## Development

```bash
npm install
npm run build
# Press F5 in VS Code to launch an Extension Development Host,
# or package a .vsix:
npm run package
```
