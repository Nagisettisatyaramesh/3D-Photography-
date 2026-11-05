"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { resetSiteImage, updateSiteImage } from "@/app/admin/actions/siteImages";
import { siteImageSlots, siteImageTypes, type SiteImageOverrides, type SiteImageSlot } from "@/lib/content/siteImages";

const CROP_WARNING_DIFFERENCE = 0.15;

function readDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable image"));
    };
    image.src = url;
  });
}

function shapeName(slot: SiteImageSlot) {
  if (slot.width === slot.height) return "square";
  return slot.width > slot.height ? "landscape" : "portrait";
}

function SlotCard({ slot, currentUrl }: { slot: SiteImageSlot; currentUrl?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function clearSelection() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = e.target.files?.[0];
    setFile(null);
    setError(null);
    setNotice(null);
    if (!chosen) return;

    function reject(message: string) {
      setError(message);
      clearSelection();
    }

    if (!siteImageTypes.includes(chosen.type)) return reject("This file type isn't allowed. Use JPG, PNG or WebP.");
    if (chosen.size > slot.maxMB * 1024 * 1024) {
      return reject(`This file is ${(chosen.size / 1024 / 1024).toFixed(1)} MB. The limit here is ${slot.maxMB} MB.`);
    }

    let size;
    try {
      size = await readDimensions(chosen);
    } catch {
      return reject("This file couldn't be read as an image.");
    }

    if (size.width < slot.width || size.height < slot.height) {
      return reject(`This image is ${size.width} × ${size.height} px. It needs to be at least ${slot.width} × ${slot.height} px.`);
    }

    const requiredShape = slot.width / slot.height;
    const shapeDifference = Math.abs(size.width / size.height - requiredShape) / requiredShape;
    if (!slot.uncropped && shapeDifference > CROP_WARNING_DIFFERENCE) {
      setNotice(`This image is ${size.width} × ${size.height} px, a different shape from the frame, so its edges will be cropped.`);
    } else {
      setNotice(`This image is ${size.width} × ${size.height} px and fits.`);
    }
    setFile(chosen);
  }

  function handleUpload() {
    if (!file) return;
    const formData = new FormData();
    formData.set("slot", slot.key);
    formData.set("image", file);
    setError(null);
    startTransition(async () => {
      try {
        const result = await updateSiteImage(formData);
        if (result.error) {
          setError(result.error);
          return;
        }
        clearSelection();
        setNotice("Saved. The website now shows this image.");
      } catch {
        setError("The upload failed. Please try again.");
      }
    });
  }

  function handleReset() {
    setError(null);
    startTransition(async () => {
      try {
        const result = await resetSiteImage(slot.key);
        if (result.error) {
          setError(result.error);
          return;
        }
        clearSelection();
        setNotice("Back to the original image.");
      } catch {
        setError("The reset failed. Please try again.");
      }
    });
  }

  return (
    <li className="flex flex-col border border-ink/10 bg-white p-4">
      <div className="relative mb-3 h-48 w-full overflow-hidden bg-ink/5">
        <Image src={currentUrl ?? slot.fallback} alt={slot.label} fill sizes="320px" className="object-contain" />
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium">{slot.label}</p>
        <p className="shrink-0 text-xs text-ink/50">{currentUrl ? "Custom" : "Original"}</p>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink/60">
        At least {slot.width} × {slot.height} px ({shapeName(slot)})
        <br />
        Up to {slot.maxMB} MB · JPG, PNG or WebP
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={siteImageTypes.join(",")}
        aria-label={`Choose a new image for ${slot.label}`}
        onChange={handleChoose}
        disabled={isPending}
        className="mt-3 w-full text-xs"
      />

      {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
      {notice && !error && <p className="mt-2 text-xs text-terracotta">{notice}</p>}

      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isPending}
          className="rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.15em] text-parchment hover:bg-black disabled:opacity-40"
        >
          {isPending ? "Saving…" : "Upload"}
        </button>
        {currentUrl && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="text-xs uppercase tracking-[0.15em] text-ink/60 hover:text-terracotta disabled:opacity-40"
          >
            Use original
          </button>
        )}
      </div>
    </li>
  );
}

export function SiteImagesManager({ overrides }: { overrides: SiteImageOverrides }) {
  const groups = [...new Set(siteImageSlots.map((s) => s.group))];

  return (
    <div className="flex flex-col gap-14">
      {groups.map((group) => (
        <section key={group}>
          <h2 className="mb-5 font-serif text-2xl italic">{group}</h2>
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {siteImageSlots
              .filter((s) => s.group === group)
              .map((s) => (
                <SlotCard key={s.key} slot={s} currentUrl={overrides[s.key]} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
