"use client";

import { useState, useTransition } from "react";
import { updateWebsiteSettings } from "@/app/admin/actions/settings";

type Settings = {
  studio_name: string;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  instagram: string | null;
  youtube: string | null;
};

export function SettingsForm({ settings }: { settings: Settings }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const result = await updateWebsiteSettings(formData);
      setMessage(result?.error ? result.error : "Saved.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6">
      <Field label="Studio Name">
        <input name="studio_name" defaultValue={settings.studio_name} className={inputClass} />
      </Field>
      <Field label="Tagline">
        <input name="tagline" defaultValue={settings.tagline ?? ""} className={inputClass} />
      </Field>
      <Field label="Phone">
        <input name="phone" defaultValue={settings.phone ?? ""} className={inputClass} />
      </Field>
      <Field label="WhatsApp Number (digits only, with country code)">
        <input name="whatsapp" defaultValue={settings.whatsapp ?? ""} className={inputClass} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" defaultValue={settings.email ?? ""} className={inputClass} />
      </Field>
      <Field label="Address">
        <input name="address" defaultValue={settings.address ?? ""} className={inputClass} />
      </Field>
      <Field label="Instagram URL">
        <input name="instagram" defaultValue={settings.instagram ?? ""} className={inputClass} />
      </Field>
      <Field label="YouTube URL">
        <input name="youtube" defaultValue={settings.youtube ?? ""} className={inputClass} />
      </Field>

      {message && <p className="text-sm text-terracotta">{message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}

const inputClass = "w-full border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.12em] text-ink/50">{label}</span>
      {children}
    </label>
  );
}
