import { NextResponse, type NextRequest } from "next/server";
import { languageFrom } from "./app/language";
import { siteHost } from "./app/seo";

const productionAliases = new Set(["dilara-kizildag-xr1l.vercel.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (productionAliases.has(host) && host !== siteHost) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = siteHost;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-language", languageFrom(request.nextUrl.searchParams.get("lang") ?? undefined));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|webp|png|jpg|jpeg|gif|ico|woff2)$).*)"],
};
