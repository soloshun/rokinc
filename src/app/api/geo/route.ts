import { NextRequest, NextResponse } from "next/server";

/**
 * Visitor country from the edge network's geo headers.
 * On Vercel this is `x-vercel-ip-country` (ISO 3166-1 alpha-2);
 * locally it's absent and the client falls back to USD.
 */
export function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "";
  return NextResponse.json(
    { country },
    { headers: { "Cache-Control": "private, max-age=3600" } }
  );
}
