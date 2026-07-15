import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { resolveServerPath } from "./server-config";

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration("nomo");
  const serverPath = resolveServerPath(config.get<string>("lsp.path"));

  const serverOptions: ServerOptions = {
    run: { command: serverPath, transport: TransportKind.stdio },
    debug: { command: serverPath, transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "nomo" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.nomo"),
    },
  };

  client = new LanguageClient(
    "nomo",
    "Nomo Language Server",
    serverOptions,
    clientOptions
  );

  client.start().catch((err) => {
    vscode.window.showErrorMessage(
      `Failed to start nomo-lsp ("${serverPath}"). Make sure it is built and on your PATH, or set "nomo.lsp.path". ${err}`
    );
  });
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
