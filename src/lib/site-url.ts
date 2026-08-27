const localSiteUrl = "http://localhost:3000";

function normalizeUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return undefined;

  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export function resolveSiteUrl(configuredUrl?: string, vercelUrl?: string) {
  return normalizeUrl(configuredUrl) ?? normalizeUrl(vercelUrl) ?? localSiteUrl;
}
