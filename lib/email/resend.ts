import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

export const isResendConfigured = Boolean(apiKey && fromEmail);

function getClient() {
  if (!apiKey) return null;
  return new Resend(apiKey);
}

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
  const client = getClient();
  if (!client || !fromEmail) throw new Error("Resend is not configured.");

  const { error } = await client.emails.send({
    from: fromEmail,
    to,
    subject: `Your Wedding Proposal from Unique Creations — ${quotationNumber}`,
    html: `
      <div style="font-family: Georgia, serif; color: #2b241e; max-width: 560px; margin: 0 auto;">
        <p style="font-size: 15px;">Dear ${customerName},</p>
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
      },
    ],
  });

  if (error) throw new Error(error.message);
}
