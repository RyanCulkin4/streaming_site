// lib/getData.ts
export async function getData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`[getData] ${url} → ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn(
      `[getData] fetch failed for ${url}:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
