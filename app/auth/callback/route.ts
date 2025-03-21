import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");
    const error_description = requestUrl.searchParams.get("error_description");

    if (error) {
      console.error("Error de autenticación:", error, error_description);
      return NextResponse.redirect(
        new URL(`/login?error=${error}&description=${error_description}`, requestUrl.origin)
      );
    }

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error("Error al intercambiar el código:", exchangeError);
        return NextResponse.redirect(
          new URL(`/login?error=exchange_error&description=${exchangeError.message}`, requestUrl.origin)
        );
      }
    }

    return NextResponse.redirect(new URL("/", requestUrl.origin));
  } catch (error) {
    console.error("Error en el callback:", error);
    return NextResponse.redirect(
      new URL("/login?error=unknown&description=Error desconocido", request.url)
    );
  }
} 