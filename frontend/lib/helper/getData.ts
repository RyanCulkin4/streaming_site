// lib/getData.ts
export async function getData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);

    // network OK but 4xx / 5xx
    if (!res.ok) {
      console.warn(`[getData] ${url} → ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    // network error, timeout, DNS, etc.
    console.warn(
      `[getData] fetch failed for ${url}:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
