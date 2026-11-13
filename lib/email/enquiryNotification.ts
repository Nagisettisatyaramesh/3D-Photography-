import "server-only";

import { createSmtpSender, escapeHtml } from "./smtp";

export type EnquiryNotification = {
  fullName: string;
  mobile: string;
  email: string;
  eventType: string;
  eventDate?: string | null;
  location?: string | null;
  numberOfEvents?: number | null;
  servicesInterested: string[];
  message?: string | null;
};

const display = (value?: string | number | null) =>
  value === undefined || value === null || value === "" ? "Not provided" : escapeHtml(String(value));

export async function sendEnquiryNotification(enquiry: EnquiryNotification): Promise<boolean> {
  const sender = createSmtpSender();
  const to = process.env.CONTACT_TO;

  if (!sender || !to) {
    console.error("Enquiry email was not sent because SMTP configuration is incomplete.");
    return false;
  }

  const safeName = enquiry.fullName.replace(/[\r\n]+/g, " ").trim();
  const rows = [
    ["Name", enquiry.fullName],
    ["Mobile", enquiry.mobile],
    ["Email", enquiry.email],
    ["Event type", enquiry.eventType],
    ["Event date", enquiry.eventDate],
    ["Location", enquiry.location],
    ["Number of events", enquiry.numberOfEvents],
    ["Services", enquiry.servicesInterested.join(", ")],
    ["Message", enquiry.message],
  ];

  try {
    await sender.transporter.sendMail({
      from: sender.from,
      to,
      replyTo: enquiry.email,
      subject: `New website enquiry from ${safeName}`,
      text: rows.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><th align="left" style="border:1px solid #ddd">${escapeHtml(String(label))}</th><td style="border:1px solid #ddd">${display(value)}</td></tr>`
            )
            .join("")}
        </table>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send enquiry notification email.", error);
    return false;
  }
}
