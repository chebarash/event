import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const _id = request.nextUrl.searchParams.get(`tgWebAppStartParam`);
  if (_id) {
    if (_id === "67376b65f2c7a874499e98ab") {
      return NextResponse.redirect(
        new URL(`/?_id=67383dafad59886322bd4329`, request.nextUrl.origin)
      );
    }
    return NextResponse.redirect(
      new URL(`/?_id=${_id}`, request.nextUrl.origin)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
