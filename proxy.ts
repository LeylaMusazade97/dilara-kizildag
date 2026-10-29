import { NextResponse, type NextRequest } from "next/server";
import { languageFrom } from "./app/language";

// Root layouts do not receive searchParams. Forward the URL language to the
// server layout, overwriting any client-supplied value on every request.
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-language", languageFrom(request.nextUrl.searchParams.get("lang") ?? undefined));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/", "/about", "/gallery"] };
