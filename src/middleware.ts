import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const _id = request.nextUrl.searchParams.get(`tgWebAppStartParam`);
  if (_id) {
    if (_id.startsWith(`clubs`))
      return NextResponse.redirect(
        new URL(`/${_id.replace(`clubs`, `clubs/`)}`, request.nextUrl.origin)
      );
    if (_id.startsWith(`ticket`))
      return NextResponse.redirect(
        new URL(
          `/events/${_id.replace(`ticket`, ``)}/ticket`,
          request.nextUrl.origin
        )
      );
    return NextResponse.redirect(
      new URL(`/events/${_id}`, request.nextUrl.origin)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
