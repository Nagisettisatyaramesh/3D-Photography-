import "server-only";

import { createSmtpSender, escapeHtml } from "./smtp";

export async function sendQuotationPdfEmail({
  to,
  customerName,
  quotationNumber,
  pdfBuffer,
}: {
  to: string;
  customerName: string;
  quotationNumber: string;
  pdfBuffer: Buffer;
}) {
  const sender = createSmtpSender();
  if (!sender) throw new Error("Email sending isn't configured yet.");

  const name = escapeHtml(customerName);

  await sender.transporter.sendMail({
    from: sender.from,
    to,
    subject: `Your Wedding Proposal from Unique Creations — ${quotationNumber}`,
    text: [
      `Dear ${customerName},`,
      "Thank you for considering Unique Creations for your celebration. Please find your personalised proposal attached, including your investment details on the final page.",
      "We're happy to answer any questions or make adjustments — just reply to this email.",
      "Warmly,\nUnique Creations",
    ].join("\n\n"),
    html: `
      <div style="font-family: Georgia, serif; color: #2b241e; max-width: 560px; margin: 0 auto;">
        <p style="font-size: 15px;">Dear ${name},</p>
        <p style="font-size: 15px; line-height: 1.6;">
          Thank you for considering Unique Creations for your celebration. Please find your personalised
          proposal attached, including your investment details on the final page.
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
