export function normalizeSitePath(pathname: string) {
  const pathWithoutIndexFile = pathname.replace(/\/index\.html$/, "/");
  const pathWithoutHtmlExtension = pathWithoutIndexFile.replace(/\.html$/, "");

  return pathWithoutHtmlExtension.replace(/\/+$/, "") || "/";
}

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL;
  if (path === "/") return base;
  if (path.startsWith(base)) return path;
  const baseWithoutSlash = base.replace(/\/$/, "");
  return path.startsWith("/") ? `${baseWithoutSlash}${path}` : `${baseWithoutSlash}/${path}`;
}
