"use client";
export function getSupabaseBrowserClient() {
  return { auth: { signInWithPassword: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) });
      return { error: response.ok ? null : { message: "Sign-in failed." } };
    } catch { return { error: { message: "Unable to connect." } }; }
  } } };
}
