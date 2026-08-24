import { NextResponse } from "next/server";
import { loadQuotationData } from "@/app/admin/actions/quotations";
import { renderQuotationPdf } from "@/lib/pdf/renderQuotationPdf";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await loadQuotationData(id);
  if (!data) {
    return NextResponse.json({ error: "Quotation not found." }, { status: 404 });
  }

  const pdfBuffer = await renderQuotationPdf(data);
  const { searchParams } = new URL(request.url);
  const download = searchParams.get("download") === "1";

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${data.quotation_number}-Unique-Creations.pdf"`,
    },
  });
}
