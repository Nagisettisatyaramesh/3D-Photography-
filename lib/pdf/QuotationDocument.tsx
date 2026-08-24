import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { registerPdfFonts } from "./fonts";

registerPdfFonts();

export type QuotationItemData = {
  service_name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
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
  discount_type: "percent" | "fixed";
  discount_value: number;
  additional_charges: number;
  tax_percent: number;
  created_at: string;
  items: QuotationItemData[];
};

const ink = "#2b241e";
const parchment = "#eae3d3";
const terracotta = "#e2926f";
const blush = "#f3dccb";

const styles = StyleSheet.create({
  page: {
    backgroundColor: parchment,
    color: ink,
    fontFamily: "WorkSans",
    padding: 0,
  },
  section: {
    paddingHorizontal: 56,
    paddingVertical: 48,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: `${ink}22`,
    paddingBottom: 14,
    marginBottom: 24,
  },
  studioName: {
    fontFamily: "Bodoni",
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 2,
  },
  pageHeaderTitle: {
    fontFamily: "Bodoni",
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: 26,
  },
  pageHeaderMeta: {
    fontSize: 9,
    color: `${ink}88`,
    textAlign: "right",
  },

  detailsStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: blush,
    padding: 16,
    marginBottom: 28,
  },
  detailsCell: {
    width: "33%",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 7.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: `${ink}88`,
    marginBottom: 3,
  },
  detailsValue: {
    fontSize: 10.5,
    fontWeight: 600,
  },

  table: {
    marginTop: 4,
  },
  tableHeadRow: {
    flexDirection: "row",
    backgroundColor: ink,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  tableHeadCell: {
    fontSize: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: parchment,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${ink}15`,
  },
  tableRowAlt: {
    backgroundColor: `${blush}66`,
  },
  colService: { width: "40%" },
  colQty: { width: "12%", textAlign: "center" },
  colPrice: { width: "22%", textAlign: "right" },
  colTotal: { width: "26%", textAlign: "right" },
  serviceName: { fontSize: 10.5, fontWeight: 600 },
  serviceDesc: { fontSize: 8.5, color: `${ink}88`, marginTop: 2 },
  cellText: { fontSize: 10 },

  totalsBlock: {
    marginTop: 24,
    marginLeft: "auto",
    width: "55%",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  totalsLabel: { fontSize: 9.5, color: `${ink}99` },
  totalsValue: { fontSize: 9.5, fontWeight: 600 },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: ink,
  },
  grandTotalLabel: { fontFamily: "Bodoni", fontStyle: "italic", fontWeight: 700, fontSize: 15 },
  grandTotalValue: { fontFamily: "Bodoni", fontStyle: "italic", fontWeight: 700, fontSize: 17, color: terracotta },

  termsBlock: {
    marginTop: 28,
    backgroundColor: blush,
    padding: 18,
  },
  termsLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: terracotta,
    marginBottom: 8,
  },
  termsText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: `${ink}cc`,
  },

  pageFooter: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: `${ink}66`,
  },
});

function formatINR(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

function formatDate(value: string | null) {
  if (!value) return "To be finalised";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
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

/** The single page the studio appends to its own portfolio PDF to turn it
 * into a customer's quotation — mirrors how the studio actually works
 * today (same portfolio deck for everyone, one pricing page added at the
 * end). Merged onto the real portfolio PDF in renderQuotationPdf.ts. */
export function QuotationDocument({ data }: { data: QuotationData }) {
  const totals = computeQuotationTotals(data);
  const coupleNames = [data.groom_name, data.bride_name].filter(Boolean).join(" & ") || data.customer_name || "Valued Customer";

  return (
    <Document title={`${data.quotation_number} — Unique Creations`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.pageHeader}>
            <View>
              <Text style={styles.studioName}>Unique Creations</Text>
              <Text style={styles.pageHeaderTitle}>Your Investment</Text>
            </View>
            <Text style={styles.pageHeaderMeta}>{data.quotation_number}{"\n"}{formatDate(data.created_at)}</Text>
          </View>

          <View style={styles.detailsStrip}>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Couple</Text>
              <Text style={styles.detailsValue}>{coupleNames}</Text>
            </View>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Event Date</Text>
              <Text style={styles.detailsValue}>{formatDate(data.event_date)}</Text>
            </View>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Location</Text>
              <Text style={styles.detailsValue}>{data.event_location || "To be finalised"}</Text>
            </View>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Wedding Type</Text>
              <Text style={styles.detailsValue}>{data.wedding_type || "—"}</Text>
            </View>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Contact</Text>
              <Text style={styles.detailsValue}>{data.mobile || data.email || "—"}</Text>
            </View>
            <View style={styles.detailsCell}>
              <Text style={styles.detailsLabel}>Guests</Text>
              <Text style={styles.detailsValue}>{data.number_of_guests ?? "—"}</Text>
            </View>
          </View>

          {data.intro_note ? <Text style={{ fontSize: 10, lineHeight: 1.6, color: `${ink}cc`, marginBottom: 20 }}>{data.intro_note}</Text> : null}

          <View style={styles.table}>
            <View style={styles.tableHeadRow}>
              <Text style={[styles.tableHeadCell, styles.colService]}>Service</Text>
              <Text style={[styles.tableHeadCell, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeadCell, styles.colPrice]}>Rate</Text>
              <Text style={[styles.tableHeadCell, styles.colTotal]}>Amount</Text>
            </View>

            {data.items.map((item, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                <View style={styles.colService}>
                  <Text style={styles.serviceName}>{item.service_name}</Text>
                  {item.description ? <Text style={styles.serviceDesc}>{item.description}</Text> : null}
                </View>
                <Text style={[styles.cellText, styles.colQty]}>{item.quantity}</Text>
                <Text style={[styles.cellText, styles.colPrice]}>{formatINR(item.unit_price)}</Text>
                <Text style={[styles.cellText, styles.colTotal]}>{formatINR(item.quantity * item.unit_price)}</Text>
              </View>
            ))}

            {data.items.length === 0 ? (
              <View style={styles.tableRow}>
                <Text style={[styles.cellText, { color: `${ink}66` }]}>No line items added yet.</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.totalsBlock}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>{formatINR(totals.subtotal)}</Text>
            </View>
            {totals.discount > 0 ? (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>
                  Discount {data.discount_type === "percent" ? `(${data.discount_value}%)` : ""}
                </Text>
                <Text style={styles.totalsValue}>- {formatINR(totals.discount)}</Text>
              </View>
            ) : null}
            {data.additional_charges > 0 ? (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Additional Charges</Text>
                <Text style={styles.totalsValue}>{formatINR(data.additional_charges)}</Text>
              </View>
            ) : null}
            {data.tax_percent > 0 ? (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Tax ({data.tax_percent}%)</Text>
                <Text style={styles.totalsValue}>{formatINR(totals.tax)}</Text>
              </View>
            ) : null}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Investment</Text>
              <Text style={styles.grandTotalValue}>{formatINR(totals.grandTotal)}</Text>
            </View>
          </View>

          <View style={styles.termsBlock}>
            <Text style={styles.termsLabel}>Payment Terms</Text>
            <Text style={styles.termsText}>
              {data.terms ||
                "A confirmation advance secures your date on our calendar. The remaining balance is payable as per the schedule agreed at booking. This proposal is valid for 15 days from the date above."}
            </Text>
          </View>
        </View>

        <View style={styles.pageFooter} fixed>
          <Text>Unique Creations · Tells your story with heart</Text>
          <Text>hello@uniquecreations.in · +91 98765 43210</Text>
        </View>
      </Page>
    </Document>
  );
}
