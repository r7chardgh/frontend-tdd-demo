import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(req: NextRequest) {

    const cookieStore = await cookies();
    const { email, password } = await req.json();
    if (email === 'admin@admin.com' && password === 'password') {
        let tk = 'mock-token';
        cookieStore.set('secret', tk)
        return NextResponse.json({ token: tk });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}