import path from "path";
import { readFile } from "fs/promises";
import { PDFDocument } from "pdf-lib";
import { renderToBuffer } from "@react-pdf/renderer";
import { QuotationDocument, type QuotationData } from "./QuotationDocument";

const PORTFOLIO_TEMPLATE_PATH = path.join(process.cwd(), "lib/pdf/assets/unique-creations-portfolio.pdf");

/** Reproduces what the studio does by hand today: take the studio's own
 * portfolio PDF (identical for every customer) and append one pricing page
 * personalised for this booking. The portfolio pages are copied byte-for-
 * byte from the real file — never redrawn — so the result matches exactly
 * what the studio would send manually. */
export async function renderQuotationPdf(data: QuotationData): Promise<Buffer> {
  const [templateBytes, amountPageBytes] = await Promise.all([
    readFile(PORTFOLIO_TEMPLATE_PATH),
    renderToBuffer(QuotationDocument({ data })),
  ]);

  const output = await PDFDocument.create();
  const templateDoc = await PDFDocument.load(templateBytes);
  const amountDoc = await PDFDocument.load(amountPageBytes);

  const templatePages = await output.copyPages(templateDoc, templateDoc.getPageIndices());
  templatePages.forEach((page) => output.addPage(page));

  const amountPages = await output.copyPages(amountDoc, amountDoc.getPageIndices());
  amountPages.forEach((page) => output.addPage(page));

  output.setTitle(`${data.quotation_number} — Unique Creations`);

  const mergedBytes = await output.save();
  return Buffer.from(mergedBytes);
}
