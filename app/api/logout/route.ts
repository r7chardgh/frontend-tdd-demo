import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function GET() {
    const cookieStore = await cookies();
    if (!!cookieStore.has('secret')) {
        cookieStore.delete('secret')
    }
    return NextResponse.json({ status: 200, message: "You Signed Out Succesfully" })
}