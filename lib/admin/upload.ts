import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/auth/admin";
export async function uploadMedia(_client: unknown, file: File | null, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  await requireAdmin();
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
  const ext = extensions[file.type];
  if (!ext || file.size > 4 * 1024 * 1024 || !/^[a-z]+$/.test(folder)) throw new Error("Upload a JPEG, PNG, WebP, or GIF image up to 4 MB.");
  const directory = path.join(process.env.MEDIA_ROOT || path.join(process.cwd(), "media"), folder);
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return `/media/${folder}/${filename}`;
}
