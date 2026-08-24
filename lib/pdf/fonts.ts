import path from "path";
import { Font } from "@react-pdf/renderer";

let registered = false;

/** Registers the brand's PDF fonts once per server process. Variable TTFs
 * (Bodoni Moda / Work Sans) — react-pdf/fontkit resolves the requested
 * weight/style instance from the variation axes at render time. */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  const dir = path.join(process.cwd(), "lib/pdf/fonts");

  Font.register({
    family: "Bodoni",
    fonts: [
      { src: path.join(dir, "bodoni-variable.ttf"), fontWeight: 400 },
      { src: path.join(dir, "bodoni-variable.ttf"), fontWeight: 700 },
      { src: path.join(dir, "bodoni-italic-variable.ttf"), fontWeight: 400, fontStyle: "italic" },
      { src: path.join(dir, "bodoni-italic-variable.ttf"), fontWeight: 700, fontStyle: "italic" },
    ],
  });

  Font.register({
    family: "WorkSans",
    fonts: [
      { src: path.join(dir, "worksans-variable.ttf"), fontWeight: 400 },
      { src: path.join(dir, "worksans-variable.ttf"), fontWeight: 500 },
      { src: path.join(dir, "worksans-variable.ttf"), fontWeight: 600 },
      { src: path.join(dir, "worksans-variable.ttf"), fontWeight: 700 },
    ],
  });

  // react-pdf's default hyphenation callback breaks on some names/words —
  // disable it for a cleaner, more predictable proposal document.
  Font.registerHyphenationCallback((word) => [word]);
}
