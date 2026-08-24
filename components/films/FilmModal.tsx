"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LiveFilm } from "@/lib/content/liveFilms";

type FilmModalProps = {
  film: LiveFilm | null;
  onClose: () => void;
};

function toEmbedUrl(url: string): string | null {
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;

  return null;
}

export function FilmModal({ film, onClose }: FilmModalProps) {
  useEffect(() => {
    document.body.style.overflow = film ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [film]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            {(() => {
              const embedUrl = toEmbedUrl(film.videoUrl);
              return embedUrl ? (
                <iframe
                  key={embedUrl}
                  src={embedUrl}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full bg-black"
                />
              ) : (
                <video key={film.videoUrl} src={film.videoUrl} controls autoPlay className="aspect-video w-full bg-black" />
              );
            })()}
            <div className="mt-4 flex items-center justify-between text-parchment">
              <div>
                <p className="font-serif text-2xl italic">{film.title}</p>
                <p className="eyebrow mt-1 text-parchment/60">{film.type}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-cursor-hover="Close"
                aria-label="Close film"
                className="text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-parchment"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
