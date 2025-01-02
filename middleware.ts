// ./middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export function middleware(request: NextRequest) {
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  pb.authStore.loadFromCookie(request.cookies.toString(),"pb_auth");
  const isLoggedIn = pb.authStore.isValid;

  if (request.nextUrl.pathname === '/login') {
    if (isLoggedIn) {
      const url = request.nextUrl.clone();
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith('/accounts')) {
    if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/dashboard', "/login", "/accounts"], 
};