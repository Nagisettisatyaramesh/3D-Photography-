import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;
  const contentType = contentTypes[path.extname(filename).toLowerCase()];

  if (!/^[a-z]+$/.test(folder) || !/^[0-9a-f-]+\.(gif|jpe?g|png|webp)$/i.test(filename) || !contentType) {
    return new Response("Not found", { status: 404 });
  }

  const mediaRoot = path.resolve(process.env.MEDIA_ROOT || path.join(process.cwd(), "media"));
  const filePath = path.resolve(mediaRoot, folder, filename);

  if (!filePath.startsWith(`${mediaRoot}${path.sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "EISDIR") {
      return new Response("Not found", { status: 404 });
    }
    throw error;
  }
}
