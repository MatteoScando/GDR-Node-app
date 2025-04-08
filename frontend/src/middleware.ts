import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Controlla la presenza del cookie di sessione
  const session = request.cookies.get("sessionId");

  // Se l'utente non è autenticato e sta cercando di accedere a /character
  if (!session) {
    // Reindirizza alla homepage
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continua con la richiesta originale
  return NextResponse.next();
}

// Specifica le route su cui applicare il middleware
export const config = {
  matcher: "/",
};
