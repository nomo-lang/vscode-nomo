export function resolveServerPath(configuredPath: string | undefined): string {
  const trimmed = configuredPath?.trim();
  return trimmed || "nomo-lsp";
}
