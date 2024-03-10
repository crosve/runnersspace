import { NextResponse } from 'next/server';

export async function middleware(request) {
    const verify = request.cookies.get('verify');
    console.log(verify);
    const url = request.url;

    if (url.includes('/dashboard')) {
        if (!verify) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    else if(verify && !url.includes('/dashboard')){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/']
};
