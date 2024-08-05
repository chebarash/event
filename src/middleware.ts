import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const _id = request.nextUrl.searchParams.get(`tgWebAppStartParam`);
  console.log(request.nextUrl.searchParams.toString());
  if (_id)
    return NextResponse.redirect(
      new URL(`/?_id=${_id}`, request.nextUrl.origin)
    );
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
