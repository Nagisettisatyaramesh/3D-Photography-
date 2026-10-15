/** Extracts the video ID from any common YouTube link shape:
 * watch?v= (with v anywhere in the query), youtu.be/, embed/, shorts/,
 * live/ and v/ — on www., m., music. or youtube-nocookie.com. */
export function getYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^(www|m|music)\./, "");
  const isId = (s: string | null | undefined) => (s && /^[\w-]{11}$/.test(s) ? s : null);

  if (host === "youtu.be") return isId(parsed.pathname.split("/")[1]);

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const fromQuery = isId(parsed.searchParams.get("v"));
    if (fromQuery) return fromQuery;
    const [, kind, id] = parsed.pathname.split("/");
    if (["embed", "shorts", "live", "v"].includes(kind)) return isId(id);
  }

  return null;
}

/** YouTube's own thumbnail for a video. hqdefault exists for every video
 * (maxresdefault does not), and i.ytimg.com is allowed in next.config. */
export function youTubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
