import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routes = [`clubs`, `tickets`];

export function middleware(request: NextRequest) {
  let _id = request.nextUrl.searchParams.get(`tgWebAppStartParam`);
  if (_id) {
    let def = `events`;
    for (let route of routes)
      if (_id.startsWith(route)) {
        def = route;
        _id = _id.slice(route.length);
        break;
      }
    return NextResponse.redirect(
      new URL(`/${def}/${_id}`, request.nextUrl.origin)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
