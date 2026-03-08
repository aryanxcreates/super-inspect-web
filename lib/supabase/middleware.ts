import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            for (const { name, value } of cookiesToSet) {
              request.cookies.set(name, value);
            }
            supabaseResponse = NextResponse.next({ request });
            for (const { name, value, options } of cookiesToSet) {
              supabaseResponse.cookies.set(name, value, options);
            }
          },
        },
      }
    );

    // Use getSession() instead of getUser() to avoid a fetch in middleware.
    // Next.js 15 middleware runs in a sandbox where outbound fetch to Supabase can fail.
    // Dashboard layout still calls getUser() for full server-side validation.
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    // Protect /dashboard routes — redirect to login if unauthenticated
    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    // If Supabase auth check fails (e.g. fetch failed in sandbox), allow the request.
    // Dashboard layout will call getUser() and redirect unauthenticated users.
    return NextResponse.next({ request });
  }
}
