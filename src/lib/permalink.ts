export function resolvePermalink(pathname: string, permalinks: Record<string, string>) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const base = "/" + segments[0];
  const entry = Object.entries(permalinks).find(([, path]) => path === base);
  if (!entry) return null;
  return { type: entry[0], slug: segments.slice(1) };
}
