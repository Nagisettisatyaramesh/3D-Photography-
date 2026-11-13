import path from "path";
import { Font } from "@react-pdf/renderer";

let registered = false;

/** Registers the quotation's PDF fonts once per server process: Cinzel for
 * headings and Urbanist for body text, both under the SIL Open Font License. */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  const dir = path.join(process.cwd(), "lib/pdf/fonts");

  Font.register({
    family: "Cinzel",
    fonts: [{ src: path.join(dir, "cinzel-700.woff"), fontWeight: 700 }],
  });

  Font.register({
    family: "Urbanist",
    fonts: [
      { src: path.join(dir, "urbanist-400.woff"), fontWeight: 400 },
      { src: path.join(dir, "urbanist-500.woff"), fontWeight: 500 },
      { src: path.join(dir, "urbanist-600.woff"), fontWeight: 600 },
    ],
  });

  // react-pdf's default hyphenation callback breaks on some names/words —
  // disable it for a cleaner, more predictable proposal document.
  Font.registerHyphenationCallback((word) => [word]);
}
