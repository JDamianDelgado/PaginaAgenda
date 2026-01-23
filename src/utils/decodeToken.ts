export function decodeTokenRole(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);

    const parsed = JSON.parse(decoded);
    return parsed.role;
  } catch {
    return null;
  }
}
