import "server-only";

import nodemailer from "nodemailer";

function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

  if (!host || !Number.isInteger(port) || port <= 0 || !user || !pass) return null;
  return { host, port, user, pass };
}

export function isSmtpConfigured() {
  return readSmtpConfig() !== null;
}

/** Returns the mail transport and sender address, or null if SMTP isn't set up. */
export function createSmtpSender() {
  const config = readSmtpConfig();
  if (!config) return null;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  });

  return { transporter, from: `Unique Creations <${config.user}>` };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}
