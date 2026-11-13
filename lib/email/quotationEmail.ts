import "server-only";

import { createSmtpSender, escapeHtml } from "./smtp";

/** Turns the quotation's Event Type (typed by the admin, e.g. "engagement")
 * into the words used in the email. Empty or "Other" falls back to a
 * general "celebration" so nothing says "wedding" unless it is one. */
function eventWording(eventType: string | null | undefined) {
  const cleaned = (eventType ?? "").replace(/\s+/g, " ").trim();
  if (!cleaned || /^others?$/i.test(cleaned)) {
    return { title: "", phrase: "celebration" };
  }
  const title = cleaned
    .split(" ")
    .map((w) => (w.length > 2 || w === w.toUpperCase() ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
  return { title, phrase: cleaned.toLowerCase() };
}

export async function sendQuotationPdfEmail({
  to,
  customerName,
  quotationNumber,
  eventType,
  pdfBuffer,
}: {
  to: string;
  customerName: string;
  quotationNumber: string;
  eventType?: string | null;
  pdfBuffer: Buffer;
}) {
  const sender = createSmtpSender();
  if (!sender) throw new Error("Email sending isn't configured yet.");

  const name = escapeHtml(customerName);
  const event = eventWording(eventType);
  const subjectLead = event.title ? `Your ${event.title} Proposal` : "Your Proposal";
  const intro = `Thank you for considering Unique Creations for your ${event.phrase}. Please find your personalised proposal attached, including your investment details on the final page.`;

  await sender.transporter.sendMail({
    from: sender.from,
    to,
    subject: `${subjectLead} from Unique Creations — ${quotationNumber}`,
    text: [
      `Dear ${customerName},`,
      intro,
      "We're happy to answer any questions or make adjustments — just reply to this email.",
      "Warmly,\nUnique Creations",
    ].join("\n\n"),
    html: `
      <div style="font-family: Georgia, serif; color: #2b241e; max-width: 560px; margin: 0 auto;">
        <p style="font-size: 15px;">Dear ${name},</p>
        <p style="font-size: 15px; line-height: 1.6;">
          ${escapeHtml(intro)}
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          We're happy to answer any questions or make adjustments — just reply to this email.
        </p>
        <p style="font-size: 15px; margin-top: 24px;">Warmly,<br/>Unique Creations</p>
      </div>
    `,
    attachments: [
      {
        filename: `${quotationNumber}-Unique-Creations.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
