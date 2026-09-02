import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.KALP_ADMIN_API_URL || process.env.FASTAPI_URL || process.env.BACKEND_API_URL || "https://admin.kalptree.xyz/api";
const TENANT_DB_NAME = process.env.TENANT_DB_NAME || process.env.NEXT_PUBLIC_TENANT_DB || "kp_k_h_food";

function candidateBackendUrls() {
  const urls = [BACKEND_URL];
  if (process.env.NODE_ENV !== "production") urls.unshift("http://localhost:5177/api");
  return Array.from(new Set(urls.map((url) => url.replace(/\/$/, ""))));
}

function buildPublicProductsUrl(base: string, request: NextRequest) {
  const url = new URL(`${base}/public/commerce/products/${encodeURIComponent(TENANT_DB_NAME)}`);
  request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));
  if (!url.searchParams.has("perPage")) url.searchParams.set("perPage", "100");
  return url;
}

export async function GET(request: NextRequest) {
  let lastError: unknown;

  for (const baseUrl of candidateBackendUrls()) {
    try {
      const response = await fetch(buildPublicProductsUrl(baseUrl, request), {
        cache: "no-store",
        headers: { accept: "application/json" },
      });
      const data = await response.json();
      if (!response.ok && response.status === 404) {
        lastError = data;
        continue;
      }
      return NextResponse.json(data, {
        status: response.status,
        headers: { "Cache-Control": "no-store" },
      });
    } catch (error) {
      lastError = error;
    }
  }

  return NextResponse.json(
    { error: "Storefront product feed unavailable", detail: String(lastError) },
    { status: 502, headers: { "Cache-Control": "no-store" } },
  );
}
