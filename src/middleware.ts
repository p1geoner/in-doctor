import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {i18n} from "../i18n.config";

import {match as matchLocale} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {getAllCityByCountry, getDefaultCityByCountry} from "@/app/[lang]/actions/getAllData";
import Cookies from "js-cookie";
import {cookies} from "next/headers";

async function getCityByLocale(request: NextRequest): Promise<string | undefined> {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = ['ru', 'kz', 'de', 'en']
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    console.log(languages)
    const locale = matchLocale(languages, locales, i18n.defaultLocale)
    console.log(locale)
    return await getDefaultCityByCountry({locale: locale})
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const i18nRead = await i18n.locales;

    const pathnameIsMissingLocale = !i18nRead.some((locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    console.log(pathname, pathnameIsMissingLocale,i18nRead.every(
      (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    ), i18nRead)
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        if(request.cookies.get("city") !== undefined) {
            const currentCity = request.cookies.get("city")

            console.log(currentCity)
            request.nextUrl.pathname = `${currentCity?.value}${pathname}`
        }else{
            const locale = await getCityByLocale(request)
            if(locale === undefined) {
                request.nextUrl.pathname = `/moscow${pathname}`
                NextResponse.next().cookies.set('city', 'moscow')
                const response = NextResponse.redirect(request.nextUrl)
                response.cookies.set('city', 'moscow')
                return response
            }else{
                request.nextUrl.pathname = `/${locale}${pathname}`
                const response = NextResponse.redirect(request.nextUrl)
                response.cookies.set('city', locale)
                return response
            }
        }
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(request.nextUrl)
    }
    return NextResponse.next()
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/:slug', '/', '/order', '/:slug/order']
}