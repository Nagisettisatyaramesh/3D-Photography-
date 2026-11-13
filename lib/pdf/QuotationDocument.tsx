import { readFileSync } from "fs";
import path from "path";
import { Document, Image as PdfImage, Link, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { registerPdfFonts } from "./fonts";

registerPdfFonts();

export type QuotationItemData = {
  service_name: string;
  description: string | null;
  requirement: string | null;
  event_date: string | null;
  duration: string | null;
  quantity: number;
  unit_price: number;
};

export type QuotationOutput = {
  output: string;
  count: string;
  includes: string;
};

export type QuotationData = {
  quotation_number: string;
  bride_name: string | null;
  groom_name: string | null;
  customer_name: string | null;
  mobile: string | null;
  email: string | null;
  event_date: string | null;
  event_location: string | null;
  wedding_type: string | null;
  number_of_events: number | null;
  number_of_guests: number | null;
  cover_image_url: string | null;
  intro_note: string | null;
  terms: string | null;
  payment_schedule: string | null;
  outputs: QuotationOutput[] | null;
  discount_type: "percent" | "fixed";
  discount_value: number;
  additional_charges: number;
  tax_percent: number;
  created_at: string;
  items: QuotationItemData[];
};

const ink = "#2e2522";
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const readAsset = (name: string) => ({
  data: readFileSync(path.join(process.cwd(), "lib/pdf/assets", name)),
  format: "jpg" as const,
});

const headingFont = { fontFamily: "Cinzel", fontWeight: 700 } as const;

const styles = StyleSheet.create({
  firstPage: { color: ink, fontFamily: "Urbanist", paddingTop: 122, paddingBottom: 136, paddingHorizontal: 63 },
  lastPage: { color: ink, fontFamily: "Urbanist", paddingTop: 158, paddingBottom: 136, paddingHorizontal: 63 },
  letterhead: { position: "absolute", top: 0, left: 0, width: A4_WIDTH, height: A4_HEIGHT },
  footerLogo: { position: "absolute", left: 63, top: 708, width: 136, height: 28 },
  emailLink: { position: "absolute", left: 400, top: 740, width: 145, height: 13 },
  youtubeLink: { position: "absolute", left: 400, top: 757, width: 105, height: 13 },
  instagramLink: { position: "absolute", left: 400, top: 771, width: 105, height: 13 },

  quotationNumber: { ...headingFont, fontSize: 15, textAlign: "right" },
  quotationDate: { fontSize: 8.5, fontWeight: 500, letterSpacing: 0.5, textAlign: "right", marginTop: 10 },
  toLabel: { ...headingFont, fontSize: 13, marginTop: 8 },
  customerName: { ...headingFont, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4, marginTop: 8 },
  introNote: { fontSize: 8.5, lineHeight: 1.5, marginTop: 10 },

  tableHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: ink,
    paddingBottom: 5,
    marginTop: 16,
  },
  tableHeadCell: { ...headingFont, fontSize: 10, textTransform: "uppercase" },
  tableRow: { flexDirection: "row", alignItems: "flex-start", paddingTop: 5 },
  colEvent: { width: "32%", paddingRight: 8 },
  colRequirement: { width: "26%", textAlign: "center", paddingRight: 6 },
  colDate: { width: "14%", textAlign: "center" },
  colDuration: { width: "16%", textAlign: "center" },
  colTotal: { width: "12%", textAlign: "right" },
  eventName: { fontSize: 9.5, fontWeight: 500 },
  eventDescription: { fontSize: 7, marginTop: 1.5, lineHeight: 1.25 },
  requirement: { fontSize: 7, lineHeight: 1.35 },
  rowValue: { fontSize: 8.5, fontWeight: 500 },
  tableEnd: { borderBottomWidth: 1, borderBottomColor: ink, marginTop: 10 },

  totals: { marginLeft: "auto", width: "42%", marginTop: 9 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingBottom: 5 },
  totalsLabel: { fontSize: 8.5 },
  totalsValue: { fontSize: 8.5 },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTopWidth: 1,
    borderTopColor: ink,
    paddingTop: 7,
  },
  grandTotalLabel: { ...headingFont, fontSize: 11 },
  grandTotalValue: { ...headingFont, fontSize: 13 },

  noteHeading: { fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 7 },
  dottedLine: { flexDirection: "row", alignItems: "flex-start", marginBottom: 3 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: ink, marginTop: 3.4, marginRight: 7 },
  dottedText: { flex: 1, fontSize: 8, fontWeight: 500, lineHeight: 1.35 },

  outputsHeading: { ...headingFont, fontSize: 11, textTransform: "uppercase" },
  colOutput: { width: "46%", paddingRight: 8 },
  colCount: { width: "26%", textAlign: "center", paddingRight: 6 },
  colIncludes: { width: "28%", textAlign: "center" },
  outputRow: { flexDirection: "row", alignItems: "flex-start", paddingTop: 6 },
  outputText: { fontSize: 8, lineHeight: 1.35 },
});

const EMAIL_URL = "mailto:uniquecreations.av@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/uniquecreations.av";
const YOUTUBE_URL = "https://www.youtube.com/@uniquecreations2047";

/** The logo above the address, and clickable areas over the email, YouTube
 * and Instagram lines printed in the letterhead image. */
function FooterExtras() {
  return (
    <>
      <PdfImage fixed src={readAsset("quotation-footer-logo.jpg")} style={styles.footerLogo} />
      <Link fixed src={EMAIL_URL} style={styles.emailLink}>
        <Text> </Text>
      </Link>
      <Link fixed src={YOUTUBE_URL} style={styles.youtubeLink}>
        <Text> </Text>
      </Link>
      <Link fixed src={INSTAGRAM_URL} style={styles.instagramLink}>
        <Text> </Text>
      </Link>
    </>
  );
}

/** Shows each line with one dot in front, whether or not the admin typed one. */
function DottedLines({ text }: { text: string }) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s.•·-]+/, "").trimEnd())
    .filter(Boolean);

  return (
    <>
      {lines.map((line, i) => (
        <View key={i} style={styles.dottedLine}>
          <View style={styles.dot} />
          <Text style={styles.dottedText}>{line}</Text>
        </View>
      ))}
    </>
  );
}

function formatAmount(value: number) {
  return `${Math.round(value).toLocaleString("en-IN")}/-`;
}

function formatQuotationDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }).toUpperCase();
}

function formatEventDate(value: string | null) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : "–";
}

export function computeQuotationTotals(data: {
  items: Pick<QuotationItemData, "quantity" | "unit_price">[];
  discount_type: QuotationData["discount_type"];
  discount_value: number;
  additional_charges: number;
  tax_percent: number;
}) {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discount = data.discount_type === "percent" ? (subtotal * data.discount_value) / 100 : data.discount_value;
  const afterDiscount = Math.max(subtotal - discount, 0);
  const withCharges = afterDiscount + data.additional_charges;
  const tax = (withCharges * data.tax_percent) / 100;
  const grandTotal = withCharges + tax;
  return { subtotal, discount, afterDiscount, withCharges, tax, grandTotal };
}

/** The pages added after the studio's portfolio to turn it into a customer's
 * quotation. Merged onto the portfolio PDF in renderQuotationPdf.ts. The logo,
 * leaves and contact footer are part of the letterhead images. */
export function QuotationDocument({ data }: { data: QuotationData }) {
  const totals = computeQuotationTotals(data);
  const customerName =
    data.customer_name || [data.groom_name, data.bride_name].filter(Boolean).join(" & ") || "Valued Customer";
  const outputs = data.outputs ?? [];
  const anyItemHasDate = data.items.some((item) => item.event_date);

  return (
    <Document title={`${data.quotation_number} — Unique Creations`}>
      <Page size="A4" style={styles.firstPage}>
        <PdfImage fixed src={readAsset("quotation-letterhead-first.jpg")} style={styles.letterhead} />
        <FooterExtras />

        <Text style={styles.quotationNumber}>Quotation No. {data.quotation_number}</Text>
        <Text style={styles.quotationDate}>{formatQuotationDate(data.created_at)}</Text>

        <Text style={styles.toLabel}>To</Text>
        <Text style={styles.customerName}>{customerName}</Text>
        {data.intro_note ? <Text style={styles.introNote}>{data.intro_note}</Text> : null}

        <View style={styles.tableHead} fixed>
          <Text style={[styles.tableHeadCell, styles.colEvent]}>Event</Text>
          <Text style={[styles.tableHeadCell, styles.colRequirement]}>Requirement</Text>
          <Text style={[styles.tableHeadCell, styles.colDate]}>Date</Text>
          <Text style={[styles.tableHeadCell, styles.colDuration]}>Duration/{"\n"}Schedules</Text>
          <Text style={[styles.tableHeadCell, styles.colTotal]}>Total</Text>
        </View>

        {data.items.map((item, i) => {
          const amount = item.quantity * item.unit_price;
          const eventDate = anyItemHasDate ? item.event_date : i === 0 ? data.event_date : null;
          return (
            <View key={i} style={styles.tableRow} wrap={false}>
              <View style={styles.colEvent}>
                <Text style={styles.eventName}>{item.service_name}</Text>
                {item.description ? <Text style={styles.eventDescription}>{item.description}</Text> : null}
              </View>
              <Text style={[styles.requirement, styles.colRequirement]}>{item.requirement || ""}</Text>
              <Text style={[styles.rowValue, styles.colDate]}>{formatEventDate(eventDate)}</Text>
              <Text style={[styles.rowValue, styles.colDuration]}>{item.duration || "–"}</Text>
              <Text style={[styles.rowValue, styles.colTotal]}>{amount > 0 ? formatAmount(amount) : ""}</Text>
            </View>
          );
        })}
        <View style={styles.tableEnd} />

        <View style={styles.totals} wrap={false}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Sub Total</Text>
            <Text style={styles.totalsValue}>{formatAmount(totals.subtotal)}</Text>
          </View>
          {totals.discount > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>
                Discount{data.discount_type === "percent" ? ` (${data.discount_value}%)` : ""}
              </Text>
              <Text style={styles.totalsValue}>- {formatAmount(totals.discount)}</Text>
            </View>
          ) : null}
          {data.additional_charges > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Additional Charges</Text>
              <Text style={styles.totalsValue}>{formatAmount(data.additional_charges)}</Text>
            </View>
          ) : null}
          {data.tax_percent > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax ({data.tax_percent}%)</Text>
              <Text style={styles.totalsValue}>{formatAmount(totals.tax)}</Text>
            </View>
          ) : null}
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>TOTAL</Text>
            <Text style={styles.grandTotalValue}>{formatAmount(totals.grandTotal)}</Text>
          </View>
        </View>

        {data.payment_schedule ? (
          <View style={{ marginTop: 16, width: "72%" }} wrap={false}>
            <Text style={styles.noteHeading}>Payment Schedule</Text>
            <DottedLines text={data.payment_schedule} />
          </View>
        ) : null}
      </Page>

      {outputs.length > 0 || data.terms ? (
        <Page size="A4" style={styles.lastPage}>
          <PdfImage fixed src={readAsset("quotation-letterhead-last.jpg")} style={styles.letterhead} />
          <FooterExtras />

          {outputs.length > 0 ? (
            <View style={{ marginBottom: 44 }}>
              <Text style={styles.outputsHeading}>Outputs We Give :</Text>
              <View style={styles.tableHead}>
                <Text style={[styles.tableHeadCell, styles.colOutput]}>Outputs</Text>
                <Text style={[styles.tableHeadCell, styles.colCount]}>Count/{"\n"}Duration Approx</Text>
                <Text style={[styles.tableHeadCell, styles.colIncludes]}>Includes</Text>
              </View>
              {outputs.map((row, i) => (
                <View key={i} style={styles.outputRow} wrap={false}>
                  <Text style={[styles.outputText, styles.colOutput]}>{row.output}</Text>
                  <Text style={[styles.outputText, styles.colCount]}>{row.count}</Text>
                  <Text style={[styles.outputText, styles.colIncludes]}>{row.includes}</Text>
                </View>
              ))}
              <View style={styles.tableEnd} />
            </View>
          ) : null}

          {data.terms ? (
            <View style={{ width: "72%" }} wrap={false}>
              <Text style={styles.noteHeading}>Terms &amp; Conditions</Text>
              <DottedLines text={data.terms} />
            </View>
          ) : null}
        </Page>
      ) : null}
    </Document>
  );
}
