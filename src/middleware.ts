import { NextResponse, type NextRequest } from "next/server"
import { Session } from '@remkoj/optimizely-one-nextjs/api'
import { withEditFallback } from '@remkoj/optimizely-cms-nextjs/preview'

/**
 * Demo site middleware, which performs two main tasks:
 * - Assign a visitor identifier to every visitor of the website
 * - Make the search parameters available to all pages through
 *   an header, which makes them usable in server components without 
 *   passing them down from a page.
 * 
 * Make sure that the components using these custom request headers are
 * wrapped in a Suspense component to switch to streaming for these 
 * components.
 */
export const middleware = withEditFallback((request: NextRequest) =>
{


    // Break out of CMS iframe → open preview top-level
    if (request.nextUrl.pathname === '/preview'
        && request.nextUrl.searchParams.has('key')
        && !request.nextUrl.searchParams.has('breakout')) {
        const url = request.nextUrl.clone()
        url.searchParams.set('breakout', '1')
        return NextResponse.redirect(url)
    }

    // Remove language prefix from all routes
    if (request.nextUrl.pathname.startsWith('/en')) {
        const url = request.nextUrl.clone()
        url.pathname = request.nextUrl.pathname.replace('/en', '') || '/'
        return NextResponse.rewrite(url)
    }

    // Handle all preview requests - redirect localized preview to main preview
    if (request.nextUrl.pathname.includes('/preview') && request.nextUrl.pathname !== '/preview') {
        const url = request.nextUrl.clone()
        url.pathname = '/preview'
        return NextResponse.rewrite(url)
    }

    // Enable edit mode for CMS Visual Builder
    if (request.nextUrl.searchParams.has('ctx') && request.nextUrl.searchParams.get('ctx') === 'edit') {
        const response = NextResponse.next()
        response.headers.set('x-edit-mode', 'true')
        response.headers.set('x-draft-mode', 'true')
        response.cookies.set('__prerender_bypass', 'true', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        })
        return response
    }

    // Make sure we have a known Visitor ID
    const visitorId = Session.getOrCreateVisitorId(request)

    const response = NextResponse.next()
    // Expose context via response headers only (do not override request headers to preserve cookies)
    response.headers.set('x-visitorid', visitorId)
    response.headers.set('x-search', request.nextUrl.search)
    Session.addVisitorId(response, visitorId)
    return response
})

export const config = {
    matcher: [
      // Skip all internal paths and paths with a '.'
      '/((?!.*\\.|api|assets|_next\\/static|_next\\/image|_vercel).*)',
    ]
}