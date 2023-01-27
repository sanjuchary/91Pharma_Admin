import type { NextFetchEvent, NextRequest } from 'next/server'
import {NextResponse } from "next/server"
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    let token = getCookie('token', {
        // @ts-ignore
        req,
    })
    if (!token) {
        let path = req.page.name
        if(path != '/a/logout' ) {
            let search = new URLSearchParams(req.url.split('?')[1]).toString()
            search !== '' && (path += `?${search}`)
            const url = `/?redirect=${path}`
            return NextResponse.redirect(new URL(url, req.url))
        }
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next();

}